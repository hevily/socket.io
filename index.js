/**
 * Created by Deng Zhirong on 2015/05/12.
 */

var http = require('http');           // http 模块，用于创建http server
var socketio = require('socket.io');  // socket.io 模块
var fs = require('fs');               // fs 模块，用于读取文件

// http.createServer()方法用于创建http server
// 以处理来自浏览器的请求
var app = http.createServer(function(req, res) {
    // fs.readFile()方法用于读取文件
    // 此处读取的是index.html文件
    // 也就是我们后面要编写的HTML页面文件
    fs.readFile("index.html", function (err, data) {
        if (err) {
            res.writeHead(500);
            return res.end('Error loading index.html');
        }
        res.writeHead(200); // 返回请求状态码
        res.write(data);    // 返回读取到的内容给浏览器
        res.end();
    });
}).listen(8080); // listen()方法用监听http server到指定的地址和端口，默认地址是localhost


// 在与app相同的地址和端口上创建Socket.IO服务
var io = socketio(app);

// // 监听connection事件
// // 当浏览器连接到此Socket.IO服务时触发该事件
// io.on('connection', function (socket) {
//     // 监听浏览器端的chat事件
//     socket.on('chat', function (data) {
//         console.log(data);
//     });
// });

io.on('connection', function (socket) {
    socket.on('chat', function (data) {
        console.log(data);

        // 创建sendmsg事件并把发送聊天消息给客户端
        io.emit('sendmsg', data);
    });
});