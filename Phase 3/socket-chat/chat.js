let express = require("express");

let app = express();

let http = require("http").Server(app);

let io = require('socket.io')(http);

let randomRes = ["Hello","How are you doing?","What can I help you with today?","Sorry, I can't help you","I am the manager"]

app.get("/",(req,res)=> {
    res.sendFile(__dirname+"\\index.html");
})

io.on("connection",(socket)=> {
    console.log("Client connected");
    socket.on("obj",(msg)=> {
        console.log(msg);
    })
    socket.on("name",(msg)=> {
        console.log("Hello, " + msg);
    })
    socket.on("message",(msg)=> {
        console.log("Recieved message: " + msg);
        let randomNumber = Math.floor(Math.random()*randomRes.length);
        socket.emit("", randomRes[randomNumber]);
    })

})

// please run the server using http module not express module 
http.listen(9090,()=>console.log("Server running on port number 9090"));