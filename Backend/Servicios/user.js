const express=require("express")
const router=express.Router()
const modelo=require('../Models/users')
router.use(express.json())




// Constructor
// name: String,
// user: String,
// password: String

router.post('/register',async(req,res)=>{
  try{
    let {name,user,password}=req.body
    const newuser= new modelo({name,user,password})
    await newuser.save()
  //  res.status(200).json({name,user,password})
  }catch(e){
    res.status(404).json({"message":"error trying to create user"})
  }

})

router.get('/',(req,res)=>{
    // try{
    //     MUsuario
    // }catch(e){
    //     console.log(e)
    // }
// res.send(typeof(modelo))
res.send('aaaa')

})

module.exports= router