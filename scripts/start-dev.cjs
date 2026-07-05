const { spawn } = require("node:child_process");
const { openSync } = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const node = process.execPath;
const nextBin = path.join(root, "node_modules", "next", "dist", "bin", "next");
const out = openSync(path.join(root, "dev-server.log"), "a");
const err = openSync(path.join(root, "dev-server.err.log"), "a");

const env = {};
for (const [key, value] of Object.entries(process.env)) {
  if (key.toLowerCase() !== "path") {
    env[key] = value;
  }
}

env.Path = [
  path.dirname(node),
  path.join(root, "node_modules", ".bin"),
  "C:\\WINDOWS\\system32",
  "C:\\WINDOWS"
].join(";");

const child = spawn(
  node,
  [nextBin, "dev", "--hostname", "127.0.0.1", "--port", "3000"],
  {
    cwd: root,
    env,
    detached: true,
    stdio: ["ignore", out, err],
    windowsHide: true
  }
);

child.unref();
console.log(`Started dev server pid=${child.pid}`);
