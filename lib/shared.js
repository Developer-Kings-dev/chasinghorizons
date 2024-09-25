const admin = require('firebase-admin');
const path = require('path');
const fs = require('fs');

const Photo = require('../models/Photo');
const bucket = admin.storage().bucket();

const uploadPhoto = async (file) => {
    try {
        if (!file) {
            throw new Error('Please upload a file');
        }
    
        const filePath = path.join(__dirname, '../', file.path);
        const uploadResult = await bucket.upload(filePath, {
            destination: `photos/${file.originalname}`,
            public: true,
            metadata: {
                contentType: file.mimetype
            }
        });
    
        fs.unlinkSync(filePath);
    
        const uploadedfile = uploadResult[0];
       const publicUrl = uploadedfile.publicUrl();
    
        // Save to database
        const photo = new Photo({
            url: publicUrl
        });
        await photo.save();
    
       return photo;
    } catch (error) {
        console.error(error);
        throw new Error(error.message);
    }
  };

  module.exports = { uploadPhoto };