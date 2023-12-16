const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieparser=require('cookie-parser')

dotenv.config();
const router=require("./routes/userroutes.js")
const userouter=require("./routes/authroutes.js")
mongoose.connect(process.env.MONGO).then(() => {

    
    console.log("database connected");
}).catch((err) => {
    console.log(err);
});

const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieparser())
app.use("/api/user",router)

app.use("/api/auth/",userouter)
app.listen(3001, () => {
    console.log("server is running");
    
});

app.use((err,req,res,next)=>{
   const statuscode=err.statuscode||500
   const message=err.message||'internal server problem'
   return res.status(statuscode).json({
    success:false,  
    message,
      statuscode
   })

})
