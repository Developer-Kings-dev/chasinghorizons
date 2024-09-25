const asynchandler = require('express-async-handler');
const admin = require('firebase-admin');
const path = require('path');
const fs = require('fs');

const Photo = require('../../models/Photo');

const bucket = admin.storage().bucket();

const createPhoto = asynchandler(async (req, res) => {
   try {
    if (!req.file) {
        res.status(400).send({ message: 'Please upload a file' });
        return;
    }

    const filePath = path.join(__dirname, '../../', req.file.path);
    const uploadResult = await bucket.upload(filePath, {
        destination: `photos/${req.file.originalname}`,
        public: true,
        metadata: {
            contentType: req.file.mimetype
        }
    });

    fs.unlinkSync(filePath);

    const file = uploadResult[0];
    // console.log("url: ", file.publicUrl());
    //  const publicUrl = `https://storage.googleapis.com/${bucket.name}/${file.name}`;
   const publicUrl = file.publicUrl();

    // Save to database
    const photo = new Photo({
        url: publicUrl
    });
    photo.save();

    res.status(200).send({ photo });
   } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
   }

});

const getPhotos = asynchandler(async (req, res) => {
    const photos = await Photo.find();
    res.status(200).send(photos);
});

const getPhoto = asynchandler(async (req, res) => {
    const id = req.params.id;
    const photo = await Photo.findById(id);
    if (!photo) {
        res.status(404).send({ error: 'Photo not found' });
        return;
    }

    res.status(200).send(photo);
});

module.exports = { createPhoto, getPhotos, getPhoto };