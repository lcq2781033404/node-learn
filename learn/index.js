import { IncomingMessage, ServerResponse } from "http";
const http = require("http");
const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  // 设置编码
  res.setHeader("Content-Type", "text-plain");
  res.write("hello nodejs");
  res.end();
});

server.listen(port, hostname, () => {
  console.log(`server running at ${hostname}:${port}`);
});
