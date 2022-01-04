const express = require('express')
const SocketIOFileUpload = require("socketio-file-upload")
const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server)

app.use(SocketIOFileUpload.router);
app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

io.sockets.on('connection', (socket) => {
    console.log('socket connection')

    var uploader = new SocketIOFileUpload()

    uploader.dir = "uploads"

    uploader.listen(socket)

    //whenever socket.io successfuly uploads the file to the server this fires

    uploader.on('saved', function (event) {
        console.log(event)
    })

    //when error takes place
    uploader.on('error', (event) => {
        console.log("Uplader error event", event)
    })
})

server.listen(3000, () => {
    console.log("App is running on port 3000")
})