const mongoose=require("mongoose")

mongo_url= process.env.MONGO_URL || 'mongodb://localhost:27017/bd'

let conexion=false

mongoose.connect(mongo_url)
.then(()=>{
    console.log("Conexión a la base de datos exitosa")
    conexion=true
})
.catch((e) => {
   console.log(e) 
})


module.exports = mongoose

