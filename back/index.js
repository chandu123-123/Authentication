const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const router=require("./routes/userroutes.js")

mongoose.connect(process.env.MONGO).then(() => {

    
    console.log("database connected");
}).catch((err) => {
    console.log(err);
});

const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/user",router)


app.listen(3001, () => {
    console.log("server is running");
    
});
