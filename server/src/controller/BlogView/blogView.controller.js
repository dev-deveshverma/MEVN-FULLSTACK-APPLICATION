const router=require("express").Router();
const View=require("../../model/BlogView/blogView.model");
const Blog=require("../../model/Blog/blog.model");
const ip= require("ip");
//! get all viewed blogs result
router.get("",async(req,res)=>{
    try {
        const view=await View.find().lean().exec();
        return res.status(200).send(view);
    } catch (error) {
        return res.status(400).send({message:error.message});
    }
})
//!create new view entry when user view a blog
router.post("",async(req,res)=>{
    try {
        //! current ip address
        const currentIp= req.body.ipAddress;
        //!check if req body has blogId
        if(!req.body.blogId || req.body.blogId=='') return res.status(400).send({message:"Blog id is required"}    );
        //!check if ip address and blog id already exist
        const alreadyViewed=await View.findOne({ipAddress:currentIp,blogId:req.body.blogId}).lean().exec();
        //!if already exist then return message
        if(alreadyViewed){
            return res.status(400).send({message:"Update view count successfully."});
        }
        //!else create new view entry
        const view=await View.create({
            blogId:req.body.blogId,
            ipAddress:currentIp
        });
        const updatedViewCount= await Blog.findByIdAndUpdate(req.body.blogId,{$inc:{viewcount:1}},{new:true}).lean().exec();
        //!return view entry
        return res.status(201).send({message:"Update view count successfully."});
    } catch (error) {
        return res.status(400).send({message:error.message});
    }
})
//!export router
module.exports=router;