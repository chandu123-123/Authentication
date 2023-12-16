const user=require("../models/usermodel.js")
const bcrypt=require("bcryptjs")
const test = (req, res) => {
    res.json({ msg: "working" });
};
const deleting=async (req,res)=>{
    console.log("deleteing jhjhj")
    console.log(req.body.id)
  const deleted=await user.findByIdAndDelete(req.body.id)
if(!deleted)
  res.json({msg:"user already deleted",ok:false})
else{
    res.json({msg:"user deleted",ok:true})
}
 
}
const updating = async (req, res) => {
    try {
        console.log("updating");
      console.log(req.params.id)
      console.log(req.body.formdata)
      if(req.body.formdata.password){
      req.body.formdata.password=await bcrypt.hashSync(req.body.formdata.password,10)
      }const updatedUser = await user.findByIdAndUpdate(
            req.params.id,
            
            {
                $set: {
                    username: req.body.formdata.username,
                    email: req.body.formdata.email,
                    password: req.body.formdata.password,
                    photo: req.body.formdata.photo,
                },
            },
            { new: true }
        );
         
        console.log(updatedUser);
        console.log("success")
        // Sending a response to the client
        const {password:hashpass,...rest}= updatedUser._doc
       
        res.status(200).json({ ...updatedUser,ok:true });
    } catch (error) {
        console.error(error);
        // Sending an error response if something goes wrong
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = { test,deleting,updating};
