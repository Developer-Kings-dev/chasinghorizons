const asynchandler = require('express-async-handler');

const Tag = require('../../models/Tag');

const createTag = asynchandler (async (req , res) => {
    const { name } = req.body;
    
    if(!name) {
        res.status(400).send({ message: 'Please provide all details' });
    }

    const lowerCaseName = name.toLowerCase();

    // check if tag name already exists
    const foundTag = await Tag.findOne({ name: lowerCaseName}).exec();
    if (foundTag) {
        res.status(400).send({ message: 'Tag already exists' });
    }

    const newTag = new Tag({ name: lowerCaseName });
    newTag.save();

    return res.status(201).send(newTag);
});


const getTags = asynchandler(async (req, res) => {
    const tags = await Tag.find().exec();
    res.status(200).send(tags);
});


const updateTag = asynchandler(async (req, res) => {
    const tagID = req.params.id;
    const { name } = req.body;

    if (!name) {
        res.status(400).send({ message: 'Please provide all details' });
    }

    const updatedTag = await Tag.findByIdAndUpdate(tagID, {name: name.toLowerCase() }, {req, res});
    if (!updatedTag) {
        return res.status(404).send({ message: 'Tag not found' });
    }

    return res.status(200).send(updatedTag);
});

const deleteTag = asynchandler(async (req, res) => {
    const tagID = req.params.id;

    const deletedTag = await Tag.findByIdAndDelete(tagID)
    .catch((err) => {
        res.status(500).send({ message: err.message });
    });

    return res.status(204).send({ message: 'Tag deleted successfully' })
});

module.exports = { createTag, getTags, updateTag, deleteTag };