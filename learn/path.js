const path = require("path");

// 格式化路径
console.log(path.normalize("/foo/bar//baz/asfd/quux/..")); // \foo\bar\baz\asfd

// 路径联合：将所有名称用"/"串起来，然后用normalize格式化
console.log(path.join("///foo", "bar", "//baz/asfd", "quux")); // \foo\bar\baz\asfd\quux

// 路径巡航：相当于不断的调用系统的 cd 命令
console.log(path.resolve("foo/bar", "tmp/file")); // C:\projects-github\node-learn\foo\bar\tmp\file

// 路径分隔符（linux系统为/，windows系统为\）：\
console.log(path.sep); // \
console.log(path.posix.sep); // /

// 获取文件夹名称：获取路径所在的文件夹名称
console.log(path.dirname("/foo/bar//baz/asfd/quux")); // /foo/bar//baz/asfd

// 获取文件名称：可传入第二个参数过滤掉文件扩展名
console.log(path.basename("/foo/bar//baz/asfd/quux.html")); // quux.html
console.log(path.basename("/foo/bar//baz/asfd/quux.html", ".html")); // quux

// 获取文件扩展名
console.log(path.extname("index.html")); // .html
console.log(path.extname("index.")); // .
console.log(path.extname("index")); // ''

// __dirname：获取当前文件所在目录
console.log(__dirname); // C:\projects-github\node-learn

// __filename：获取当前文件路径和名称
console.log(__filename); // C:\projects-github\node-learn\path.js
