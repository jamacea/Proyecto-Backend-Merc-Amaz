
const mongoose = require('mongoose')

const {Schema}=mongoose

const Usuario = new Schema ({
    display_name: String,
    username: String,
    password: String
},{versionKey:false})

const user_model= mongoose.model('user',Usuario)

module.exports= user_model