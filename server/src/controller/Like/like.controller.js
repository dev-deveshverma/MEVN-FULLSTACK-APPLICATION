const router = require("express").Router();
const Like = require("../../model/Like/like.model");
const Blog = require("../../model/Blog/blog.model");
const authenticate = require("../../middlewares/Authentication/authenticate");
//! get all liked blogs result
router.get("", async (req, res) => {
  try {
    const like = await Like.find().lean().exec();
    return res.status(200).send(like);
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
});
//!get all liked blogs by user id 
router.get("/:id", authenticate,async (req, res) => {
    try {
        const like = await Like.find({ userId: req.params.id }).lean().exec();
        return res.status(200).send(like);
    } catch (error) {
        return res.status(400).send({ message: error.message });
    }
});

//! router to handler like and unlike req
router.post("", authenticate, async (req, res) => {
  const { blogId } = req.body;
  const userId = req.user._id;
  try {
    const like = await Like.findOne({ userId, blogId }).lean().exec();

    if (like) {
      // User has already liked the blog, so update isLiked and likeCount accordingly
      const dislikedRes = await Like.findByIdAndUpdate(
        like._id,
        { isLiked: !like.isLiked },
        { new: true }
      )
        .lean()
        .exec();
      //!increment blog like count based on isLiked value
      const incrementValue = dislikedRes.isLiked ? 1 : -1;
      //!update like count in blog schema
      const updatedBlogRes = await Blog.findByIdAndUpdate(
        blogId,
        { $inc: { likecount: incrementValue } },
        { new: true }
      )
        .lean()
        .exec();
      //!return updated blog and like status
      return res.status(200).send({ likedPost: dislikedRes, updatedBlogRes });
    } else {
      // User is liking the blog for the first time, create a new like entry
      const liked = await Like.create({ userId, blogId, isLiked: true });
      //!update the like count in blog schema
      const updatedBlogRes = await Blog.findByIdAndUpdate(
        blogId,
        { $inc: { likecount: 1 } },
        { new: true }
      )
        .lean()
        .exec();
      //!return updated blog and like status
      return res.status(200).send({ likedPost: liked, updatedBlogRes });
    }
    // return res.status(200).send(like);
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
});
//import like router
module.exports = router;
