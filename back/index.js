const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

mongoose.connect(process.env.MONGO).then(() => {

    
    console.log("database connected");
}).catch((err) => {
    console.log(err);
});

const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

app.listen(3000, () => {
    console.log("server is running");
    
});
