const user=require("../models/usermodel.js")
const bcrypt=require("bcryptjs")
const signup = async (req, res,next) => {
    const {username,email,password}=req.body;
    const hash=bcrypt.hashSync(password,10)
    const newuser=new user({username,email,password:hash})

    try {
        await newuser.save() 
        res.status(200).json({message:"successfully added"})   
    } catch (error) {
       next(error)
    }
    
 };

 
module.exports = {signup};

