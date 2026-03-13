const assert = require("assert");
const http = require("http");
const app = require("../app");

describe("SimpleApplication", function () {
  let server;
  let port;

  before(function (done) {
    server = http.createServer(app);
    server.listen(0, function () {
      port = server.address().port;
      done();
    });
  });

  after(function (done) {
    server.close(done);
  });

  it("should return 200 for GET /", function (done) {
    http
      .get(`http://127.0.0.1:${port}/`, function (res) {
        assert.strictEqual(res.statusCode, 200);
        done();
      })
      .on("error", done);
  });

  it("should contain the page title", function (done) {
    http
      .get(`http://127.0.0.1:${port}/`, function (res) {
        let body = "";

        res.on("data", (chunk) => {
          body += chunk;
        });

        res.on("end", function () {
          assert.ok(body.includes("Simple Application"));
          done();
        });
      })
      .on("error", done);
  });

  it("should contain the sample list content", function (done) {
    http
      .get(`http://127.0.0.1:${port}/`, function (res) {
        let body = "";

        res.on("data", (chunk) => {
          body += chunk;
        });

        res.on("end", function () {
          assert.ok(body.includes("Coffee"));
          assert.ok(body.includes("Tea"));
          assert.ok(body.includes("Milk"));
          done();
        });
      })
      .on("error", done);
  });
});
