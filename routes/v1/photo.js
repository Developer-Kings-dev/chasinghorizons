const express = require('express');
const multer = require('multer');
const { createPhoto, getPhoto, getPhotos } = require('../../controllers/v1/photo');
const verifyToken = require('../../middleware/tokenHandler');

// Set up multer for file uploads
const upload = multer({ dest: 'uploads/' });
const router = express.Router();

router.post('/', verifyToken, createPhoto);
router.get('/', verifyToken, getPhotos);
router.get('/:id', verifyToken, getPhoto);

module.exports = router;