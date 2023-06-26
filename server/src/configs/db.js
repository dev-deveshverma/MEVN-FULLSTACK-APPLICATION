require('dotenv').config()
const mongoose= require("mongoose");
// *! change your user name and password form mongo atlas  while running on local machine
 module.exports= ()=>{
    return mongoose.connect(`mongodb+srv://${process.env.MONGO_USER_NAME}:${process.env.MONGO_USER_PASSWORD}@cluster0.iw17qvc.mongodb.net/Wp-blog-db?retryWrites=true&w=majority`)
 }
