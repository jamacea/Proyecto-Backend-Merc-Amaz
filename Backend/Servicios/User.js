const mongoose = require("mongoose")
const user_model= require('../Models/Model_user')
const express=require("express")
const router=express.Router()


// display_name: String,
// username: String,
// password: String

const create=(display_name="",username="",password="")=>{
    return {
        display_name: display_name,
        username:username,
        password:password}
    }


router.get('/',async (req,res)=>{
    try{
        const users=await user_model.find()
        res.send(users)
    }catch(e){
        console.log(e)
    }

})

router.post('/register',async (req,res)=>{
    try{
        const {display_name,username,password}=req.body
        console.log(username)
        const registrar=create(display_name,username,password)
        const newUser= new user_model(registrar)
        await newUser.save()
        res.status(200).json({"message":"Succesfully created"})
    }catch(e){
        console.log(e)
    }

})

module.exports=router

