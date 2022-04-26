const express=require("express")
let app=express()
// const mongoose=require("mongoose")



app.use(express.json())
//----------------------------------------CORS------------------------------------------------------

app.use(( req, res, next ) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', '*')
    if ( req.method === 'OPTIONS' ) {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
    return res.status(200).json({})
    }
    next()
   })
//----------------------------------Base de datos------------------------------------------------------------

let {mongoose,router}=require('./database')
let usuario=require('./Servicios/user')

app.use('/',router)
app.use('/users',usuario)
// mongo_url= process.env.MONGO_URL || 'mongodb://localhost:27017/bd'

// mongoose.connect(
//     mongo_url
//     )
// .then(() => {
//     app.get('/',(req,res)=>{
//         res.send('Si sirvio la conexion a la base de datos saludos steven')

//     })
// })
// .catch((e) => {
//     console.log(e)
//     app.get('/',(req,res)=>{
//         res.send('no sirvio la conexion a la base de datos ')

//     })
// })
//----------------------------------------------------------------------------------------------------------------




// express.get('/',(req,res)=>{
//     res.send('Holaaaasadd')
// })

app.listen(8080)