const asynchandler = require('express-async-handler');
const mongoose = require('mongoose');

const Post = require('../../models/Post');

const createPost = asynchandler(async (req, res) => {
    const {title, body, tags, thumbnail} = req.body;
    const userID = req.user.id;

    if (!title || !body || !thumbnail) {
       return res.status(400).send({ message: 'Please provide all details' })
    }

    if (tags.length <= 0 || !tags) {
        return res.status(400).send({ message: 'Please provide at least one tag' });
    }

    // check if tags are valid IDs
    const validTags = tags.every((tag) => mongoose.Types.ObjectId.isValid(tag));
    if (!validTags) {
        return res.status(400).send({ message: 'Invalid tag ID' });
    }

    const post = new Post({
        title,
        body,
        thumbnail,
        tags,
        user: userID
    }); 
    await post.save();

    return res.status(201).send(post);
});

const getPosts = asynchandler(async (req, res) => {
    const posts = await Post.find().populate('tags').exec();
    res.status(200).send(posts);
});

const getPost = asynchandler(async (req, res) => {
    const id = req.params.id;
    const post = await Post.findById(id).populate('comments').populate('tags').exec();
    if (!post) {
        res.status(404).send({ message: 'Post not found' });
        return;
    }

    res.status(200).send(post);
});

const partialUpdatePost = asynchandler(async (req, res) => {
    const id = req.params.id;
    const { title, body, tags, thumbnail } = req.body;

    let updatedPostData = {};
    if (title) updatedPostData.title = title;
    if (body) updatedPostData.body = body;
    if (tags && tags.length >= 1) updatedPostData.tags= tags;
    if (thumbnail) updatedPostData.thumbnail = thumbnail;

    if (tags) {
        const validTags = tags.every((tag) => mongoose.Types.ObjectId.isValid(tag));
        if (!validTags) {
            return res.status(400).send({ message: 'Invalid tag ID' });
        }
    }

    const post = await Post.findByIdAndUpdate(
        id, 
        updatedPostData,
      { new: true}).exec();

    if (!post) {
        return res.status(404).send({ message: 'Post not found' });
    }

    return res.status(200).send(post);
})

const deletePost = asynchandler(async (req, res) => {
    const id = req.params.id;

    const deletedPost = await Post.findByIdAndDelete(id)
        .catch((err) => {
            res.status(500).send({ message: err.message });
        });

    return res.status(200).send({ message: 'Post deleted successfully' });
    
});

module.exports = { 
    createPost,
    getPosts,
    getPost,
    partialUpdatePost,
    deletePost
};