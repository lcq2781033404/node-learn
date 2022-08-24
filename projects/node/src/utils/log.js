const fs = require("fs");
const path = require("path");

const createWriteStream = (fileName) => {
  const fullFileName = path.join(__dirname, "../", "../", "logs", fileName);
  const writeStream = fs.createWriteStream(fullFileName, {
    // 标识：a表示追加内容；w表示覆盖内容
    flags: "a",
  });
  return writeStream;
};

/**
 * 写日志
 * @param {*} fileName
 * @param {*} logConent
 */
const writeLog = (fileName, logConent) => {
  const stream = createWriteStream(fileName);
  // 写日志方法
  stream.write(logConent + "\n");
};

module.exports = writeLog;
