const express = require('express');
const multer = require('multer');
const {
        createPost,
        getPosts,
        getPost,
        partialUpdatePost,
        deletePost
} = require('../../controllers/v1/post');
const verifyToken = require('../../middleware/tokenHandler');


// Set up multer for file uploads
const upload = multer({ dest: 'uploads/' });
const router = express.Router();

router.post('/', upload.single('photo'),verifyToken, createPost);
router.get('/', verifyToken, getPosts);
router.get('/:id/', verifyToken, getPost);
router.patch('/:id/', verifyToken, partialUpdatePost);
router.delete('/:id/', verifyToken, deletePost);

module.exports = router;