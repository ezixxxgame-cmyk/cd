import assert from "node:assert/strict";
import http from "node:http";

function request(host) {
  return new Promise((resolve, reject) => {
    const req = http.request(
      {
        hostname: "127.0.0.1",
        port: 3100,
        path: "/",
        method: "HEAD",
        headers: { Host: host }
      },
      resolve
    );

    req.on("error", reject);
    req.end();
  });
}

const legacyResponse = await request("cd-wa1dx.vercel.app");
assert.equal(
  legacyResponse.statusCode,
  404,
  `legacy domain must return 404, received ${legacyResponse.statusCode}`
);

const productionResponse = await request("www.sokolnikovufa.ru");
assert.notEqual(
  productionResponse.statusCode,
  404,
  "production domain must remain available"
);

console.log("legacy domain: 404; production domain: unchanged");
