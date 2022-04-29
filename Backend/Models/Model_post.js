
const mongoose = require('mongoose')


const {Schema}=mongoose

const CreatePost = new Schema ({
    user_id:{type:mongoose.Types.ObjectId,ref:"user",required:true},
    img_url:{type:String,required:true},
    display_name:{type:String,required:true},
    description:{type: String,required: true},
    price:{type: Number, required:true}
},{versionKey:false})

const post_model= mongoose.model('post',CreatePost)

module.exports= post_model