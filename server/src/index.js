const express= require("express");
const connect= require("./configs/db");
const  cors= require("cors");
const path=require('path')
const app= express();
const port=process.env.PORT || 4568;
//** Import controllers
const {register,login}= require("./controller/Auth/auth.controller");
const userController= require("./controller/User/user.controller");
const blogController=require("./controller/Blog/blog.controller")
const likeController= require("./controller/Like/like.controller");
const commentController= require("./controller/comment.controller");
const blogViewController=require("./controller/BlogView/blogView.controller");

//global middlewares


app.use(cors());
app.use(express.json())
//** defining routes */
//?auth routes
app.post("/api/register",register)
app.post("/api/login",login)
//?user routes
app.use("/api/users",userController)
//?blog routes
app.use("/api/blogs",blogController)
//?like routes
app.use('/api/likes',likeController)

//?blog view route
app.use("/api/blogview",blogViewController)

//!listen to the server

//? comment routes 
app.use('/api/comments',commentController)


//?listen to the server

app.listen( port  , async()=>{
    try {
          await connect()
          console.log(`listening port number ${port}   `)
    } catch (error) {
        console.log("Error while connecting to database" , error.message)
    }
})