const querystring = require("querystring");
const obj = {
  name: "zhangsan",
  age: 20,
};
console.log(querystring.stringify(obj)); // name=zhangsan&age=20
console.log(querystring.parse(querystring.stringify(obj))); // obj
