# Temporary Vercel 404 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Return HTTP 404 only for `cd-wa1dx.vercel.app` while keeping all production-domain behavior unchanged.

**Architecture:** Remove the existing permanent redirect for the legacy host. Add a small Next.js routing middleware that returns a plain 404 response when the request host matches the legacy domain and `BLOCK_LEGACY_DOMAIN` is not set to `false`; otherwise routing continues normally.

**Tech Stack:** Next.js 15, TypeScript, Vercel, PowerShell/curl verification

## Global Constraints

- `cd-wa1dx.vercel.app` must return 404 for every path while blocking is enabled.
- `www.sokolnikovufa.ru`, `sokolnikovufa.ru`, and `sokolnikovufa.vercel.app` behavior must remain unchanged.
- Restoring the legacy site requires setting `BLOCK_LEGACY_DOMAIN=false` and redeploying.

---

### Task 1: Host-specific temporary 404

**Files:**
- Create: `middleware.ts`
- Modify: `next.config.ts`

**Interfaces:**
- Consumes: incoming request hostname and optional `BLOCK_LEGACY_DOMAIN` environment variable.
- Produces: HTTP 404 for `cd-wa1dx.vercel.app` when blocking is enabled; `NextResponse.next()` for every other request.

- [ ] **Step 1: Run the pre-change routing check**

Run the production server locally, then request the legacy host:

```powershell
npm run build
npm run start
curl.exe -I -H "Host: cd-wa1dx.vercel.app" http://localhost:3000/
```

Expected before implementation: response is not `404` because `next.config.ts` permanently redirects the host.

- [ ] **Step 2: Add the host-specific middleware**

Create `middleware.ts`:

```ts
import { NextRequest, NextResponse } from "next/server";

const LEGACY_DOMAIN = "cd-wa1dx.vercel.app";

export function middleware(request: NextRequest) {
  const blockingEnabled = process.env.BLOCK_LEGACY_DOMAIN !== "false";

  if (blockingEnabled && request.nextUrl.hostname === LEGACY_DOMAIN) {
    return new NextResponse("Not Found", {
      status: 404,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "X-Robots-Tag": "noindex, nofollow"
      }
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/:path*"
};
```

- [ ] **Step 3: Remove the redirect that runs before middleware**

Delete this redirect object from `next.config.ts`:

```ts
{
  source: "/:path*",
  has: [
    {
      type: "host",
      value: "cd-wa1dx.vercel.app"
    }
  ],
  destination: "https://www.sokolnikovufa.ru/:path*",
  permanent: true
}
```

- [ ] **Step 4: Build and verify**

Run:

```powershell
npm run build
npm run start
curl.exe -I -H "Host: cd-wa1dx.vercel.app" http://localhost:3000/
curl.exe -I -H "Host: www.sokolnikovufa.ru" http://localhost:3000/
```

Expected: legacy host returns `404`; main host does not return `404`; build succeeds.

- [ ] **Step 5: Verify the restore switch**

Run the server with `BLOCK_LEGACY_DOMAIN=false`, then request the legacy host:

```powershell
$env:BLOCK_LEGACY_DOMAIN="false"
npm run start
curl.exe -I -H "Host: cd-wa1dx.vercel.app" http://localhost:3000/
Remove-Item Env:BLOCK_LEGACY_DOMAIN
```

Expected: legacy host does not return `404`.

- [ ] **Step 6: Commit**

```powershell
git add middleware.ts next.config.ts
git commit -m "fix: temporarily disable legacy Vercel domain"
```
