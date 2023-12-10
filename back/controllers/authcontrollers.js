const { errorhandler } = require("../error.js");
const jwt = require('jsonwebtoken');
const user=require("../models/usermodel.js")
const bcrypt=require("bcryptjs")
const signup = async (req, res,next) => {
    const {username,email,password}=req.body;
    console.log("entered")
  

    try {
        let newuser;

            if(typeof password==='string'){

            const hash=bcrypt.hashSync(password,10)
         newuser=new user({username,email,password:hash})
            }
        
        await newuser.save() 
        console.log("created user")
        res.status(200).json({message:"successfully added",ok:true})   
    } catch (error) {
       next(error)
    }
    
 };
 const signin = async (req, res,next) => {
    const {email,password}=req.body;

    try {
      let validpass
       const validuser=await user.findOne({email})
       if(!validuser) return next(errorhandler(404,"invalid user"))
       if(typeof password==='string'){
        validpass=await bcrypt.compareSync(password,validuser.password)
       }
       else{
        return next(errorhandler(404,"enter credentials"))
       }
       
       if(!validpass) return next(errorhandler(401,"wrong credentials"))
   
       const payload = {
       
       id:validuser._id,
        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24) // Expiration time in seconds (1 day)
    };
    
    // Your secret key (for signing the token)
    const secretKey = process.env.JWTKEY;
 
    // Encoding the token
    const token = jwt.sign(payload, secretKey);

  const {password:hashedpassword,...rest}=await validuser._doc
rest.success=true
    res.cookie('jwt', token, {httpOnly: true,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        secure: true, // Set 'secure' in production
        sameSite: 'strict',}).status(200).json(rest);
    

    } catch (error) {
        console.log(error)
       next(error)
    }
    
 };
module.exports = {signup,signin};

