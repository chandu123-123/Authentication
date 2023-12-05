const express =require("express")
const router=express.Router()
const { test } = require("../controllers/usercontrollers.js");

router.get("/",test)

module.exports=router;