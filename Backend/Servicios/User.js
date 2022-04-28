const mongoose = require("mongoose")
const user_model= require('../Models/Model_user')
const express=require("express")
const { route } = require("express/lib/application")
const router=express.Router()


// display_name: String,
// username: String,
// password: String
//-----------------------------------Funciones y validaciones----------------------------------------------------


const create=(display_name="",username="",password="")=>{
    return {
        display_name: display_name,
        username:username,
        password:password}
    }


const valido=(sesion)=>{
    const {username,password}=sesion
    return Boolean(username && password)
}

const validarusuario= async (username)=>{    
    const query=await user_model.findOne({username})
    return  Object.keys(query).length===0?true:false
}

// let aver={a:"ab"}
// let {a}=aver
// let resultado={a}
// console.log(resultado)



// console.log(Boolean("username" && "a")) //true
// console.log(Boolean("username" && "b")) //false

//-----------------------------------------------------------------------------------------------




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
        console.log(validarusuario(username))
        allowed= await validarusuario(username)
        if(allowed){
        const registrar=create(display_name,username,password)
        const newUser= new user_model(registrar)
        await newUser.save()
        res.status(200).json({"message":"Succesfully created"})
    }else{
            res.status(400).json({"message":"Already exist, try another username"})
        }
    }catch(e){
        console.log(e)
    }

})

router.post('/login',async (req,res)=>{
    let {username,password}=req.body
    let sesion={username,password}
    if(valido(sesion)){
      try{  
        const query= await user_model.findOne({username,password})
        res.status(200).json(query)
    }catch(e){
        console.log(e)
    }
    }else{
        res.status(404).json({"message":"not found"})
    }
})



module.exports=router

