const redis = require("redis");
const { redisConfig } = require("../conf/db");

// 连接redis
const redisClient = redis.createClient(redisConfig.port, redisConfig.host);
console.log("redisClient", redisClient);
redisClient.on("error", (err) => {
  console.error(err);
});

const setRedisValue = (key, value) => {
  if (typeof value === "object") {
    value = JSON.stringify(value);
  }
  redisClient.set(key, value);
};

const getRedisValue = (key) => {
  return new Promise((resolve, reject) => {
    redisClient.get(key, (error, value) => {
      console.log("redisClient get!!!!", error, value);
      if (error) {
        reject(error);
      }
      if (!value) {
        resolve(value);
      }
      try {
        resolve(JSON.parse(value));
      } catch (e) {
        resolve(value);
      }
    });
  });
};

module.exports = {
  setRedisValue,
  getRedisValue,
};
