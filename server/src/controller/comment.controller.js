const express = require("express");
const router = express.Router();
const Comment = require("../model/comment.model");
const Blog=require("../model/Blog/blog.model");
const authenticate = require("../middlewares/Authentication/authenticate");


// create single comment upload route
router.post("/", authenticate, async (req, res) => {

  let {content } = req.body;
  let errors = {}; 
  if(!content){
    errors.fullName = "The Content is required!";
  } 
  if(Object.keys(errors).length > 0){
    return res.status(400).send({errors});
  }
  const blogId=req.body.post_id;
    try {
        const comment = await Comment.create({
        content: req.body.content,
        post_id: req.body.post_id,
        userId: req.user._id,
        });
        const updateBlogRes = await Blog.findByIdAndUpdate(blogId, { $push: { comments: comment } }, )
        return res.status(201).send(comment);
    } catch (error) {
        return res.status(401).send({ message: error.message });
    }
});


// *? all comments get route

router.get("", async (req, res) => {
    try {
      const comments = await Comment.find()
        .lean()
        .exec();
  
      return res.status(200).send(comments);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  });


module.exports = router;
  