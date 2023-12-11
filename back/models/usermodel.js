const mongoose=require("mongoose")
const userschema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
      
    },
    photo:{
        type:String,
        default:"https://i.pinimg.com/originals/a8/57/00/a85700f3c614f6313750b9d8196c08f5.png"
    }
},{timestamps:true})
const user= mongoose.model("User",userschema)
module.exports=user