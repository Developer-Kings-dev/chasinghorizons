const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            min: 6,
            max: 255
        },
        body: {
            type: String,
            required: true,
            min: 10,
            max: 10000
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        comments: {
            type: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Comment',    
            }],
            required: false
        },
        tags: {
            type: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Tag',    
            }],
            required: false
        },
        thumnail: {
            type: String,
            required: false
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Post', PostSchema);