const express = require("express");
const app = express();
const url = require("url");
const querystring = require("querystring");
const router = express.Router();

// 定义一个示例接口
router.get("/", (req, res) => {
  const query = url.parse(req.url).query;
  const queryParams = querystring.parse(query);
  res.send("get 接口获取参数");
});

/**
 * 解析body的参数需要中间件：body-parser
 * body-parser：正常情况下可以直接使用，但是如果发现这个中间件报错了，需要安装：npm install body-parser -S
 */
router.post("/", (req, res) => {
  console.log(req.body); // { name: 'zhangsan', age: '20' }
  res.send("post 接口获取参数");
});

module.exports = router;
