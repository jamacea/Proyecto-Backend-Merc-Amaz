const mongoose = require("mongoose")
const user_model= require('../Models/Model_user')
const express=require("express")
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
    if(query){
    return  Object.keys(query).length==0?true:false}else{
        return true
    }
}

const id_exist= async(user_id)=>{
    const query= await user_model.findOne({user_id:mongoose.Types.ObjectId(user_id)})
    return Boolean(query)
}



// const build_id= async (_id)=>{
//     const query=await user_model.()
// }

// let aver={a:"ab"}
// let {a}=aver
// let resultado={a}
// console.log(resultado)



// console.log(Boolean("username" && "a")) //true
// console.log(Boolean("username" && "b")) //false

//-----------------------------------------------------------------------------------------------




router.get('/all',async (req,res)=>{
    try{
        const users=await user_model.find()
        res.send(users)
    }catch(e){
        console.log(e)
    }

})

router.post('/register',async (req,res)=>{
    try{
        const {owner_id,display_name,username,password}=req.body
        console.log(username)
        allowed= await validarusuario(username)
        if(allowed){
        const registrar=create(display_name,username,password)
        const newUser= new user_model(registrar)
        // const{_id}=newUser
        // newUser.user_id=_id
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
    res.status(400).json({"message":e})
    }
    }else{
        res.status(404).json({"message":"not found"})
    }
})

router.post('/',async(req,res)=>{
    try{
        const {user_id}=req.body
        console.log(user_id)
        const query=await user_model.findById(user_id).exec()
        if(Object.keys(query)){
            res.status(200).json(query)
        }else{ 
            res.status(404).json({"message":"Doesn't exist that id"})
        }
    }catch(e){
        console.log('error-----'+e)
        res.status(400).json({"message":"Doesn't exist that id"})
    }
})


// router.post('/prev-login',async (req,res)=>{


// })



// Funciona
router.post('/update',async(req,res)=>{
    const {user_id,lastname}=req.body
    if(user_id && lastname){
    if(id_exist(user_id)){    
     try{   
     const pipeline=[{$set:{"lastname":lastname}}]    
     const query=await user_model.updateOne({user_id:mongoose.Types.ObjectId(user_id)},pipeline)
     res.status(200).json(query)
    }catch(e){
        console.log(e)
        res.status(404).json({message:"Bad request"})

     }
    }else{
        res.status(404).json({message:"user_id doesn't exist"})
    }
    }else{
        res.status(404).json({message:"Bad request"})
    }


})

module.exports=router

