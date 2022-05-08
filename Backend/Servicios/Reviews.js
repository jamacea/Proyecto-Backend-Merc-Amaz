const mongoose = require("mongoose")
const user_model = require("../Models/Model_user")
const express = require("express")
const router = express.Router()
const {post_model} = require("../Models/Model_post")
const review_model = require("../Models/Model_Reviews")

//---------------------------------------------------------------------------------------------------------------

const exist_owner = async (user_id) => {
	const query = await user_model.findById(user_id)
	if (query !== null) {
		return Object.keys(query).length !== 0
	} else {
		return false
	}
}

const exist_post = async (product_id) => {
	const query = await post_model.findById(product_id)
	if (query !== null) {
		return Object.keys(query).length !== 0
	} else {
		return false
	}
}
//---------------------------------------------------------------------------------------------------------------

router.post("/", async (req, res) => {
	const {user_id, product_id, rating, description} = req.body
	if (
		user_id &&
		product_id &&
		rating >= 0 &&
		rating <= 10 &&
		rating &&
		description
	) {
		const exist_user = await exist_owner(user_id)
		if (exist_user) {
			const exist_publication = await exist_post(product_id)
			if (exist_publication) {
				try {
					const doc = new review_model({
						user_id,
						product_id,
						rating,
						description,
					})
					await doc.save()
					res.status(200).json(doc)
				} catch (e) {
					res.status(500).json(e)
				}
			} else {
				res.status(404).json({message: "Product_id not found"})
			}
		} else {
			res.status(404).json({message: "User_id not found"})
		}
	} else {
		res.status(400).json({message: "Insert data again correctly"})
	}
})

router.get("/", async (req, res) => {
	const {product_id, user_id} = req.query
	if (product_id && user_id) {
		const exist_user = await exist_owner(user_id)
		if (exist_user) {
			const exist_publication = await exist_post(product_id)
			if (exist_publication) {
				try {
					const query = await review_model.find({user_id, product_id})
					res.status(200).json(query)
				} catch (e) {
					res.status(500).json(e)
				}
			} else {
				res.status(404).json({message: "Product_id doesn't exist"})
			}
		} else {
			res.status(404).json({message: "User_id doesn't exist"})
		}
	} else {
		res.status(400).json({message: "Add product_id and user_id"})
	}
})

module.exports = router
