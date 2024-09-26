const express = require('express');
const dotenv = require('dotenv').config();
const admin = require("firebase-admin");
const connectDB = require('./config/dbConfig');

const app = express();
const port = process.env.PORT || 8000;
const serviceAccount = require("./firebaseadminsdk.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "gs://chasing-horizons-b6560.appspot.com"
});


// Connect to database
connectDB();

app.use(express.json());

app.get('/health', (req, res) => {
    res.status(200).send({ message: 'Server is running' });
});

app.use("/v1/user/", require("./routes/v1/user"));
app.use("/v1/auth/", require("./routes/v1/auth"));
app.use("/v1/tag/", require("./routes/v1/tag"));
app.use("/v1/photo/", require("./routes/v1/photo"));
app.use("/v1/post/", require("./routes/v1/post"));
app.use("/v1/comment/", require("./routes/v1/comment"));

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});