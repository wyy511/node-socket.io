// 现在我们要建一个聊天服务，通过web服务进入聊天室的客户端
// 引入http标准模块，require是commandjs模块标准
const http = require("http"); // 在node.js中有http的API，可以用这个搭建一个服务器
const fs = require("fs"); // 从node中找到fs模块
const ws = require("socket.io"); // 引入socket.io包


const server = http.createServer((req, res) => {
  const html = fs.readFileSync("client.html"); // readFile是异步读取，readFileSync是同步读取,现在要读取客户端html文件
  // 回调函数，req代表请求信息，res代表响应信息
  res.end(html); // 服务器向客户端响应内容
}); // 这个方法专门用来创建一个web服务器

const io = ws(server); // 基于当前的web服务启动socket实例
var msgList = [];
var userNum = 0;
var userIdLIst = [];

io.on('connection', socket => {
  console.log("当前由用户里连接聊天室")
  // 一旦监测到客户端有哦数据过来，要接受客户端的信息
  socket.on("changeName", (data) => {
    const { name } = data;
    let curUser = userIdLIst.filter(v => v.name === name);
    let msg = null;
    let status = null; // 用户的状态，0从未进入，1进入过
    if (curUser.length) {
      userId = curUser[0].userId;
      msg = `${name}已重新连接`;
      status = 0;
    } else {
      userId = ++ userNum;
      msg = `欢迎${name}加入房间`;
      status = 1;
      userIdLIst.push({
        userId,
        name,
        status
      })
    }
    // msg是客户端发来的信息
    io.emit("changeName", {
      msg,
      status
    }); // 服务端将msg信息广播给所有的客户端，
  }); // 监听到客户端信息后就广播出去
  // 用户信息的变更
  socket.on("changeUserInfo", (data) => {
    userIdLIst = userIdLIst.map(v => {
      if (v.name === data.name) {
        v.avatar = data.avatar
      }
      return v;
    });
  })
  // 一旦监测到客户端有哦数据过来，要接受客户端的信息
  socket.on("chat", (data) => {
    const item = {
      userId: data.userId,
      name: data.name,
      msg: `${data.name}: ${data.msg}`
    };
    msgList.push(item)
    // msg是客户端发来的信息
    io.emit("chat", item); // 服务端将msg信息广播给所有的客户端，
  }); // 监听到客户端信息后就广播出去
}); //connection是监测链接事件

server.listen(3000, () => {
  console.log('listing in 3000')
}); // web服务监听3000端口,此时可以使用node server.js启动服务器