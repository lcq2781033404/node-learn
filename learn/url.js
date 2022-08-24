/**
 * url模块是处理 url 格式的
 */
const url = require("url");

// url一共提供了三个方法，分别是 url.parse()  url.format()  url.resolve()
// 注：上面这三个方法由于安全问题目前已经不推荐使用，可以使用 new URL() 来代替。不过还是要了解这三个方法的作用
// console.log(URL);
// console.log(new URL("https://www.baidu.com"));

/**
 * url.parse()
 * parse 方法可以将一个url的字符串解析并返回一个url的对象
 */
const urlParsed = url.parse("https://www.baidu.com");
console.log(urlParsed); // object

/**
 * url.format()
 * format 方法将传入的url对象变成url字符串并返回
 */
const urlFormatted = url.format(urlParsed);
console.log(urlFormatted); // https://www.baidu.com/

/**
 * url.resolve(from, to)
 * resolve 方法返回一个格式为 "from/to" 的字符串，对传入的两个参数用"/"符号进行拼接，并返回
 */
const urlResolved = url.resolve("https://wwww.baidu.com/555", "666");
console.log(urlResolved); // https://www.baidu.com/666
