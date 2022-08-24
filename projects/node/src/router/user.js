const { login } = require("../controller/user");
const { setRedisValue } = require("../db/redis");
const { SuccessModel, ErrorModel } = require("../model/resModel");

const handleUserRouter = (req, res) => {
  const { method, path } = req;

  // 登录
  if (method === "POST" && path === "/api/user/login") {
    const { username, password } = req.body;
    return login(username, password).then((data) => {
      if (data.username) {
        // 设置 session
        req.session.username = data.username;
        req.session.realname = data.realname;

        // 存入redis
        setRedisValue(req.sessionId, req.session);

        return new SuccessModel();
      }
      return new ErrorModel("登录失败");
    });
  }
};

module.exports = handleUserRouter;
