// load the module 
let express = require("express");
let bodyParser = require("body-parser");

//connect to mongo
let mongoose = require("mongoose");
let url = "mongodb://localhost:27017/tcsmean";
mongoose.pluralize(null);
mongoose.connect(url).
then(res=>console.log("connected")).
catch(err=>console.log(err))
let db = mongoose.connection;

let courseSchema = mongoose.Schema({
    _id:Number,
    cName:String,
    desc:String,
    amount:Number
});
let courseModel = mongoose.model("Courses",courseSchema);

//creating the reference of express module 
let app = express();
// which is use to enable post data receving from normal html form. 
app.use(bodyParser.urlencoded({extended:true}))

app.get("/",(request,response)=> {
    response.sendFile(__dirname+"\\index.html");
})
app.get("/index",(request,response)=> {
    response.sendFile(__dirname+"\\index.html");
})
app.get("/addCourse",(request,response)=> {
    response.sendFile(__dirname+"\\addCourse.html");
})
app.get("/updateCourse",(request,response)=> {
    response.sendFile(__dirname+"\\updateCourse.html");
})
app.get("/fetchCourses",(request,response)=> {
    courseModel.find({},(err,data)=> {
        if(!err){
            response.json(data);
        }else {
             response.json(err);   
        }
    })
})
app.get("/deleteCourse",(request,response)=> {
    response.sendFile(__dirname+"\\deleteCourse.html");
})

app.post("/create",(request,response)=>{
    let courseDetail = request.body;      // json data from body. 
    let course = new courseModel({_id:courseDetail._id,cName:courseDetail.cName,desc:courseDetail.desc,amount:courseDetail.amount});

    courseModel.insertMany(course, (err,result)=> {
        if(!err){
            console.log(result)
        } else {
            console.log(err);
        }
        mongoose.disconnect();  
    })// store in mongo
    response.sendFile(__dirname+"\\index.html");
});

app.post("/update",(request,response)=>{
    let course = request.body;
    courseModel.updateOne({_id:course._id},{$set:{amount:course.amount}},(err,result)=> {
        if(!err){
            response.send(result);
        }else {
            response.send(err);
        }
    })
    response.sendFile(__dirname+"\\index.html");
});

app.post("/delete",(request,response)=>{
    let course = request.body;
    courseModel.deleteOne({_id:course._id},(err,result)=> {
        if(!err){
            response.send(result);
        }else {
            response.send(err);
        }
    })
    response.sendFile(__dirname+"\\index.html");
});



app.listen(9090,()=>console.log("Server running on port number 9090"))