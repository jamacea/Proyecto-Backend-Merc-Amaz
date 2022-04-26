// const {mongoose}= require('../database')
const mongoose=require('mongoose')
const express=require('express')
const router=express.Router()

// const Schema = mongoose.Schema

const myschema= new mongoose.Schema({
    name: "",
    user: "",
    password: ""
},{versionKey:false})

const MUsuario= mongoose.model('User',myschema)

module.exports= MUsuario;