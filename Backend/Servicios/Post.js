const mongoose = require("mongoose")
const {post_model} = require("../Models/Model_post")
const express = require("express")
const user_model = require("../Models/Model_user")
const router = express.Router()

//-----------------------------------Funciones y validaciones----------------------------------------------------
const exist_owner = async (user_id) => {
	console.log(user_id)
	const query = await user_model.findById(user_id)
	console.log(query)
	if (query !== null) {
		return Object.keys(query).length !== 0
	} else {
		return false
	}
}

//---------------------------------------------------------------------------------------------------------------

router.post("/", async (req, res) => {
	const {user_id, img_url, display_name, description, price} = req.body
	const user_exist = await exist_owner(user_id)

	if (user_exist && img_url && display_name && description && price) {
		try {
			const doc = new post_model({
				user_id,
				img_url,
				display_name,
				description,
				price,
			})
			await doc.save()
			res.status(201).json(doc)
		} catch (e) {
			console.log(e)
			res.status(500).json({message: "not able to create"})
		}
	} else {
		res.status(500).json({message: "error, documento no se pudo crear"})
	}
})

router.get("/recent", async (req, res, next) => {
	try {
		const query = await post_model.find()
		res.status(200).json(query)
	} catch (e) {
		console.log(e)
		res.status(500).json(e)
	}
})

router.get("/", async (req, res) => {
	const {post_id} = req.query
	const {user_id} = req.query
	if (post_id) {
		try {
			const query = await post_model.findById(post_id)

			res.status(200).json(query)
		} catch (e) {
			console.log(e)
			res
				.status(404)
				.json({message: 'Not found remember to take out "" from the id'})
		}
	} else if (user_id) {
		const existe = await exist_owner(user_id)
		if (existe) {
			try {
				const query = await post_model.find({
					user_id: mongoose.Types.ObjectId(user_id),
				})
				res.status(200).json(query)
			} catch (e) {
				console.log(e)
				res.status(500).json({message: "error"})
			}
		} else {
			res.status(404).json({message: "user doesn't exists"})
		}
	} else {
		res.status(500).json({message: "invalid query"})
	}
})

// router.get('/',async(req,res)=>{
//     const {user_id}=req.query
//     console.log(user_id)
//     if(user_id){
//         const existe=await exist_owner(user_id)
//         if(existe){

//             try{
//             const query= await post_model.find({user_id:mongoose.Types.ObjectId(user_id)})
//             res.status(200).json(query)}
//             catch(e){
//                 console.log(e)
//                 res.status(500).json({"message":"error"})
//             }

//         }else{
//             res.status(404).json({"message":"user doesn't exists"})
//         }

//     }else{
//         res.status(404).json({"message":"not a good user id"})
//     }
// })

//---------------------------------------------------------------------------------------------------------------
module.exports = router
