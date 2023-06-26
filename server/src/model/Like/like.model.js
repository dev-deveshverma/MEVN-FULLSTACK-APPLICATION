const mongoose = require("mongoose");
// like schema for blog post and also a method which will increment/decrement the like count in blog schema 
const likeSchema = new mongoose.Schema({
    blogId:{type:mongoose.Schema.Types.ObjectId,ref:"blog",required:true},
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"user",required:true},
    isLiked:{type:Boolean,default:false}
},{
    versionKey:false,
    timestamps:true
})

// export like model
module.exports = mongoose.model("like",likeSchema);