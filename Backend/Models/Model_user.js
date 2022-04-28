
const mongoose = require('mongoose')
const { mongo } = require('../database')

const {Schema}=mongoose

const Usuario = new Schema ({
    user_id: mongoose.Types.ObjectId,
    display_name: String,
    username: String,
    password: String
},{versionKey:false})

const user_model= mongoose.model('user',Usuario)

module.exports= user_model