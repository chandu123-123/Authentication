const jwt=require("jsonwebtoken")
const verifytoken=(req,res,next)=>{
    const token=req.cookies.access_token;
    console.log(token)
    console.log("update")
}
module.exports={verifytoken}