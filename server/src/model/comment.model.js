const {default: mongoose} = require('mongoose');

/*
id
content
post_id
*/

const commentSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    post_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "blog",
      required: true,
    },
    userId:{type:mongoose.Schema.Types.ObjectId,ref:'user',required:true}
  },
  {
    versionKey: false, // removed __v
    timestamps: true, // createdAt, updatedAt
  }
);

module.exports = mongoose.model("comment", commentSchema); // comment => comments
