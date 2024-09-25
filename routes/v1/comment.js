const express = require('express');
const {createComment, getPostWithComments} = require('../../controllers/v1/comment');
const verifyToken = require('../../middleware/tokenHandler');


const router = express.Router();

router.post('/:id', verifyToken, createComment);
router.get('/post/:id', getPostWithComments);

module.exports = router;