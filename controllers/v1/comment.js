const asynchandler = require('express-async-handler');
const mongoose = require('mongoose');

const Comment = require('../../models/Comment');
const Post = require('../../models/Post');

const createComment = asynchandler(async (req, res) => {
    const postID = req.params.id;
    const userID = req.user.id;
    const { body } = req.body;

    // check if tags are valid IDs
    idValid = mongoose.Types.ObjectId.isValid(postID);
    if (!idValid) {
        return res.status(400).send({ message: 'Invalid post ID' });
    }

    if (!body) {
        return res.status(400).send({ message: 'Please provide all the details' });
    }

    const comment = new Comment({
        body,
        post: postID,
        user: userID,
    });
    await comment.save();

     // Push comment ID to the post's comments array
     await Post.findByIdAndUpdate(postID, { $push: { comments: comment._id } });


    return res.status(201).send(comment);
});

const getPostWithComments = asynchandler(async (req, res) => {
    const postID = req.params.id;

    // check if postID is valid
    const idValid = mongoose.Types.ObjectId.isValid(postID);
    if (!idValid) {
        return res.status(400).send({ message: 'Invalid post ID' });
    }

    // Fetch the post and populate comments
    const post = await Post.findById(postID).populate('comments');
    if (!post) {
        return res.status(404).send({ message: 'Post not found' });
    }

    return res.status(200).send(post);
});

module.exports = { createComment, getPostWithComments };