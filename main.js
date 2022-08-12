const express = require("express");
const router = require("./route");
const bodyParser = require("body-parser");

const baseUrl = "/";

// 应用对象
const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(baseUrl, router);

app.listen(3000, () => {
  console.log("后端启动");
});
