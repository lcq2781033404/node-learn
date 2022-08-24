const querystring = require("querystring");
const { getRedisValue } = require("./src/db/redis");
const handleBlogRouter = require("./src/router/blog");
const handleUserRouter = require("./src/router/user");
const writeLog = require("./src/utils/log");

// session 数据
const SESSION_DATA = {};

/**
 * 设置 cookie 过期时间
 * @returns
 */
const setCookieExpires = () => {
  const d = new Date();
  d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
  return d.toGMTString();
};

/**
 * 获取post data
 * @param {*} req 请求的req对象
 */
const getPostData = (req) => {
  return new Promise((resolve, reject) => {
    if (req.method !== "POST") {
      resolve({});
      return;
    }
    if (req.headers["content-type"] !== "application/json") {
      resolve({});
      return;
    }
    let postData = "";
    req.on("data", (chunk) => {
      postData += chunk.toString();
    });
    req.on("end", () => {
      if (!postData) {
        resolve({});
        return;
      }
      resolve(JSON.parse(postData));
    });
  });
};

const serverHandler = (req, res) => {
  // 记录 access log
  writeLog(
    "access.log",
    `${req.method} -- ${req.url} -- ${
      req.headers["user-agent"]
    } -- ${Date.now()}`
  );

  // 设置返回格式 JSON
  res.setHeader("Content-type", "application/json");

  const url = req.url;
  req.path = url.split("?")[0];

  // 解析 cookie
  req.cookie = {};
  const cookieStr = req.headers.cookie || "";
  cookieStr.split(";").forEach((item) => {
    if (!item) {
      return;
    }
    const arr = item.split("=");
    const key = arr[0].trim();
    const val = arr[1].trim();
    req.cookie[key] = val;
  });

  // 解析 session
  let needSetCookie = false;
  // sessionId 是一个没有意义的随机数，仅标识用
  let sessionId = req.cookie.sessionId;
  if (!sessionId) {
    sessionId = Date.now();
    needSetCookie = true;
  }
  getRedisValue(sessionId).then((value) => {
    if (!value) {
      value = {};
    }
    req.session = value;

    // 解析query
    req.query = querystring.parse(url.split("?")[1]);

    // 解析post data
    getPostData(req).then((postData) => {
      req.body = postData;

      // 处理blog路由
      const blogResult = handleBlogRouter(req, res);
      if (blogResult) {
        blogResult.then((blogData) => {
          if (needSetCookie) {
            res.setHeader(
              "Set-Cookie",
              `sessionId=${sessionId}; path=/; httpOnly; expires=${setCookieExpires()}`
            );
          }
          res.end(JSON.stringify(blogData));
        });
        return;
      }

      // 处理user路由
      const userResult = handleUserRouter(req, res);
      if (userResult) {
        userResult.then((userData) => {
          if (needSetCookie) {
            res.setHeader(
              "Set-Cookie",
              `sessionId=${sessionId}; path=/; httpOnly; expires=${setCookieExpires()}`
            );
          }
          res.end(JSON.stringify(userData));
        });
        return;
      }

      // 未命中路由，返回404
      res.writeHead(404, { "Content-type": "text/plain" });
      res.write("404 Not Found");
      res.end();
    });
  });
};

module.exports = serverHandler;
