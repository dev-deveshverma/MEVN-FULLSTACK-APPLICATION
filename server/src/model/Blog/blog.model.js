const {default: mongoose} = require('mongoose');
/*
id
title
content
author
comments
likecount
viewcount
likestatus
*/

const blogSchema = new mongoose.Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    author: {type:mongoose.Schema.Types.ObjectId, ref: 'user', required: true},
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'comment' }],
    likecount: {type: Number, default: 0},
    viewcount: {type: Number , default: 0 },
    likestatus: {type: Boolean },
}, {    
    versionKey: false,
    timestamps: true
});

module.exports = mongoose.model('blog', blogSchema);