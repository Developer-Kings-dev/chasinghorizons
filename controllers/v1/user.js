const asynchandler = require('express-async-handler');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = require('../../models/User');
const {uploadPhoto} = require('../../lib/shared');

const createUser = asynchandler(async (req, res) => {
    const { username, email, password } = req.body;

    if(!username || !email || !password) {
        res.status(400).send({ message: 'Please provide all the details'});
        return;
    }
 
    let photo;
    if (req.file) {
        photo = await uploadPhoto(req.file);
        photo = photo.url;
    } else {
        photo = null;  
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);

// check if email or username already exists
const foundUser = await User.findOne({ $or: [{ email: email}, { username: username}] }).exec();
if (foundUser) {
    res.status(400).send({message: 'User already exists'});
    return;
}

console.log("foundUser:", foundUser); 

    const user = new User({
        username,
        email,
        password: hashedPassword,
        profilePhoto: photo
    });

    try{
        const savedUser = await user.save();
        res.status(201).send(savedUser);
    } catch (error) {
        res.status(400).send({ message: error.message});
    }

});

const getUser = asynchandler(async (req, res) => {
    const userId = req.user.id;

    const user = await User.findById(userId)
        .catch((err) => {
            res.status(500).send({ message: err.message });
        });
    if (!user) {
        res.status(404).send({ message: 'User not found' });
        return;
    }

    res.status(200).send(user);
});

const updateUser = asynchandler(async (req, res) => {
    const userId = req.user.id;
    const { username, email } = req.body;

    let updatedOwnerData = {};
    if (username) updatedOwnerData.username = username;
    if (email) updatedOwnerData.email = email;

    const updatedUser = await User.findByIdAndUpdate(userId, updatedOwnerData, { new: true })
       .catch((err) => {
            res.status(500).send({ message: err.message });
        });

        if (!updatedUser) {
            res.status(404).send({ message: 'User not found' });
            return;
        }

        res.status(200).send(updatedUser);
});

const archiveUser = asynchandler(async (req, res) => {
    const userId = req.user.id;

    const updateUser = await User.findByIdAndUpdate(userId, { archive: true }, { new: true});

    if (!updateUser) {
        res.status(404).send({ message: 'User not found' });
        return;
    }

    res.status(200).send(updateUser);
});

module.exports = { createUser, getUser, updateUser, archiveUser };