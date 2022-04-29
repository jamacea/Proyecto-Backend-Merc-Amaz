const mongoose = require("mongoose")
const post_model= require('../Models/Model_post')
const express=require("express")
const user_model = require("../Models/Model_user")
const router=express.Router()

//-----------------------------------Funciones y validaciones----------------------------------------------------
const exist_owner=async(user_id)=>{
    console.log(user_id)
    const query=await user_model.findById(user_id)
    console.log(query)
    if(query!==null)
    {return Object.keys(query).length!==0}else{return false}
}


//---------------------------------------------------------------------------------------------------------------

router.post('/',async(req,res)=>{
    const {user_id,img_url,display_name,description,price}=req.body
    const user_exist= await exist_owner(user_id)

   if( user_exist && img_url && display_name && description && price){
        try{const doc= new post_model({user_id,img_url,display_name,description,price})
        await doc.save()
        res.status(201).json(doc)        
    }catch(e){
        console.log(e)
        res.status(500).json({"message":"not able to create"})

    }
    }else{
        res.status(500).json({"message":"error, documento no se pudo crear"})
    }


})


router.get('/recent',async(req,res)=>{
    try{
        const query= await post_model.find()
        res.status(200).json(query)

    }catch(e){
        console.log(e)
        res.status(500).json(e)
    }
})


//---------------------------------------------------------------------------------------------------------------
module.exports=router

console.log([]==null)