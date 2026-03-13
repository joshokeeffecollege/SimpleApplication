const test = require("node:test");
const assert = require("node:assert");
const http = require("node:http");
const app = require("../app");

let server;
let port;

function startServer() {
  return new Promise((resolve) => {
    server = http.createServer(app);
    server.listen(0, () => {
      port = server.address().port;
      resolve();
    });
  });
}

function stopServer() {
  return new Promise((resolve, reject) => {
    server.close((err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}

function getResponse(path) {
  return new Promise((resolve, reject) => {
    http
      .get(`http://127.0.0.1:${port}${path}`, (res) => {
        let body = "";

        res.on("data", (chunk) => {
          body += chunk;
        });

        res.on("end", () => {
          resolve({ statusCode: res.statusCode, body });
        });
      })
      .on("error", reject);
  });
}

test.before(async () => {
  await startServer();
});

test.after(async () => {
  await stopServer();
});

test("should return 200 for GET /", async () => {
  const res = await getResponse("/");
  assert.strictEqual(res.statusCode, 200);
});

test("should contain the page title", async () => {
  const res = await getResponse("/");
  assert.ok(res.body.includes("Simple Application"));
});

test("should contain the sample list content", async () => {
  const res = await getResponse("/");
  assert.ok(res.body.includes("Coffee"));
  assert.ok(res.body.includes("Tea"));
  assert.ok(res.body.includes("Milk"));
});
