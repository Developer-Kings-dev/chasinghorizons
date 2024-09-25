const mongoose = require('mongoose');
const {PhotoSchema} = require('./Photo');

const UserSchema = new mongoose.Schema(
     {
        username: {
            type: String,
            required: true,
            min: 6,
            max: 255
        },
        email: {
            type: String,
            required: true,
            min: 6,
            max: 255
        },
        password: {
            type: String,
            required: true,
            min: 6,
            max: 1024
        },
        profilePhoto: {
            type: String,
            required: false,
            default: null
        },
        archive: {
            type: Boolean,
            default: false
        }
     },
     { timestamp: true }
);

module.exports = mongoose.model('User', UserSchema);