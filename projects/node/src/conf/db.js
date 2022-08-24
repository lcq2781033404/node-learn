// 环境变量
const env = process.env.NODE_ENV;

let mysqlConfig;
let redisConfig;

if (env === "dev") {
  mysqlConfig = {
    host: "localhost",
    user: "root",
    password: "lcqlcqqpqp852",
    port: 3306,
    database: "myblog",
  };

  redisConfig = {
    port: 6379,
    host: "127.0.0.1",
  };
}

if (env === "production") {
  // 线上数据库
  mysqlConfig = {
    host: "localhost",
    user: "root",
    password: "lcqlcqqpqp852",
    port: 3306,
    database: "myblog",
  };
  // 线上redis配置
  redisConfig = {
    port: 6379,
    host: "127.0.0.1",
  };
}

module.exports = {
  mysqlConfig,
  redisConfig,
};
