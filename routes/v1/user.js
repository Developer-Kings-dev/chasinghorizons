const express = require('express');
const multer = require('multer');
const  { createUser, getUser, updateUser, archiveUser } = require('../../controllers/v1/user');
const verifyToken = require('../../middleware/tokenHandler');

const upload = multer({ dest: 'uploads/' });
const router = express.Router();

router.post("/", upload.single('photo'), createUser);
router.get("/", verifyToken, getUser);
router.patch("/", verifyToken, updateUser);
router.delete("/", verifyToken, archiveUser);

module.exports = router;