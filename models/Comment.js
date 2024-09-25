const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema(
    {
        post: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post',
            required: true
        },
        body: {
            type: String,
            required: true,
            min: 6,
            max: 1024
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        replies: {
            type: [this],
            required: false
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Comment', CommentSchema);