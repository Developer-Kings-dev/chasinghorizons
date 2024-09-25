const mongoose = require('mongoose');

const PhotoSchema = new mongoose.Schema(
    {
        url: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Photo', PhotoSchema);