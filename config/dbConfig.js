const mongoose = require('mongoose');

const dbURI = process.env.DB_URI;

const connectDB = async () => {
    mongoose.connect(dbURI)
        .then(() => {
            console.log('MongoDB Connected...');
        })
        .catch((error) => {
            console.log('Error connecting to MongoDB:', error.message);
        });
};

module.exports = connectDB;