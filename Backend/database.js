const mongoose=require("mongoose")
const express=require('express')
const router=express.Router()

mongo_url= process.env.MONGO_URL || 'mongodb://localhost:27017/bd'



mongoose.connect(mongo_url)
.then(()=>{ router.get('/',(req,res)=>{res.status(200).send('connected to database')})
    
    
})
.catch((e) => {
    console.log(e)
    router.get('/',(req,res)=>{res.status(200).send('connected to database')})
    
})


module.exports = {mongoose,router}

