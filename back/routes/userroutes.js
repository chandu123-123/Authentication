const express =require("express")
const router=express.Router()
const { test,deleting } = require("../controllers/usercontrollers.js");

router.get("/",test)

module.exports=router;