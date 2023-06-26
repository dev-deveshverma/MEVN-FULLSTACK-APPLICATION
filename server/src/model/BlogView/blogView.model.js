const mongoose = require('mongoose');
//! blog view schema
const blogViewSchema= new mongoose.Schema({
    blogId:{type:mongoose.Schema.Types.ObjectId,ref:"blog",required:true},
    ipAddress:{type:String,required:true}
},{
    versionKey:false,
    timestamps:true
})
//! export blog view model
module.exports = mongoose.model("blogView",blogViewSchema);