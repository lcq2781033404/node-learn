const mysql = require("mysql");
const { mysqlConfig } = require("../conf/db");

// 创建连接对象
const con = mysql.createConnection(mysqlConfig);

// 开始连接: 只连接一次
con.connect();

// 统一执行sql语句的函数
const exec = (sql) => {
  return new Promise((resolve, reject) => {
    con.query(sql, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
};

module.exports = {
  exec,
  escape: mysql.escape,
};
