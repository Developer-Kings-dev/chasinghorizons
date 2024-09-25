const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const asynchandler = require('express-async-handler');


const JWTSECRET = process.env.JWT_SECRET;

const verifyToken = asynchandler(async (req, res, next) => {
    let token = req.headers.authorization;

    if (!token) {
        res.status(401).json({ error: 'Not authorized, no token' });
        return;
    }

    token = token.split(' ')[1];
    jwt.verify(token, JWTSECRET, (err, decoded) => {
        if (err) {
            res.status(401).json({
                error: 'Not authorized, token failed',
                message: err.message,
            });
            return;
        }
        
        //check if the ID is valid
        if (!mongoose.Types.ObjectId.isValid(decoded.id)) {
            res.status(401).send({ message: 'Not authorized, invalid user' });
            return;
        }

        req.user = decoded;
        next();
    });
});


module.exports = verifyToken;