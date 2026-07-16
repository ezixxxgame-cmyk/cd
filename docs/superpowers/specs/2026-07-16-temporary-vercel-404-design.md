# Temporary 404 for the legacy Vercel domain

## Goal

Temporarily return HTTP 404 for requests to `cd-wa1dx.vercel.app` so Yandex can remove the legacy URL from search results.

## Scope

- `cd-wa1dx.vercel.app`: return 404 for every path.
- `www.sokolnikovufa.ru`: no behavior change.
- `sokolnikovufa.ru`: keep the existing permanent redirect to `www.sokolnikovufa.ru`.
- `sokolnikovufa.vercel.app`: keep the existing redirect and asset-serving behavior.

## Implementation

Replace the existing `cd-wa1dx.vercel.app` redirect in `next.config.ts` with a host-specific rewrite to a dedicated Next.js route that calls `notFound()`. The browser stays on the legacy URL and receives a real 404 response.

## Rollback

To restore the legacy domain, remove the temporary rewrite and restore its existing permanent redirect. Deploying that change re-enables the previous behavior.

## Verification

- Build succeeds.
- A request with host `cd-wa1dx.vercel.app` returns 404.
- Main-domain routing remains unchanged.
