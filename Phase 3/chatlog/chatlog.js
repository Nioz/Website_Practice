let express = require("express");

let app = express();

let bodyParser = require("body-parser");

let mongoose = require("mongoose");
let url = "mongodb://localhost:27017/tcsmean";
mongoose.pluralize(null);
mongoose.connect(url).
then(res=>console.log("connected")).
catch(err=>console.log(err))
let db = mongoose.connection;

let postSchema = mongoose.Schema({
    title:String,
    msg:String
});
let postModel = mongoose.model("Post",postSchema);

let tempTitle = "";

let http = require("http").Server(app);

let io = require('socket.io')(http);

app.get("/",(req,res)=> {
    res.sendFile(__dirname+"\\index.html");
})

io.on("connection",(socket)=> {
    console.log("Client connected");
    socket.on("obj",(msg)=> {
        console.log(msg);
    })
    socket.on("title",(msg)=> {
        tempTitle = msg;
    })
    socket.on("message",(msg)=> {
        console.log("Post title: " + tempTitle);
        console.log("Post body: " + msg);

        let post = new postModel({title:tempTitle,msg:msg});

        postModel.insertMany(post, (err,result)=> {
            if(!err){
                console.log(result)
            } else {
                console.log(err);
            }
            mongoose.disconnect();  
        })

        socket.emit("confirm", tempTitle + " " + msg);
        tempTitle = "";
    })

})


// please run the server using http module not express module 
http.listen(9090,()=>console.log("Server running on port number 9090"));