const express=require("express")
let app=express()
const mongoose=require("mongoose")



app.use(express.json())

app.use(( req, res, next ) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    if ( req.method === 'OPTIONS' ) {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
    }
    next();
   });

mongo_url= process.env.MONGO_URL || 'mongodb://localhost:27017/bd'

mongoose.connect(
    mongo_url
    )
.then(() => {
    app.get('/',(req,res)=>{
        res.send('Si sirvio la conexion a la base de datos saludos steven')

    })
})
.catch((e) => {
    console.log(e)
    app.get('/',(req,res)=>{
        res.send('no sirvio la conexion a la base de datos ')

    })
})

app.get('/:id/:aca',(req,res)=>{
try{
let id= +req.params.id
let aca=req.params.aca
res.status(200).json({"dato_id":id,"aca":aca})
}
catch(error){
    res.status(404).json({"message":"Valiendo cotopla"})

}

})
// express.get('/',(req,res)=>{
//     res.send('Holaaaasadd')
// })

app.listen(8080)