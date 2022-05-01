const mongoose = require("mongoose")
const post_model = require("../Models/Model_post")
const express = require("express")
const user_model = require("../Models/Model_user")
const cart_model = require("../Models/Model_cart")
const res = require("express/lib/response")
const router = express.Router()

//---------------------------------------------------------------------------------------------------------------
const exist_owner = async (user_id) => {
	const query = await user_model.findById(user_id)
	console.log(query)
	if (query !== null) {
		return Object.keys(query).length !== 0
	} else {
		return false
	}
}

const exist_post = async (product_id) => {
	const query = await post_model.findById(product_id)
	console.log(query)
	if (query !== null) {
		return Object.keys(query).length !== 0
	} else {
		return false
	}
}

const exist_item = async (item_id) => {
	const query = await cart_model.findById(item_id)
	console.log(query)
	if (query !== null) {
		return Object.keys(query).length !== 0
	} else {
		return false
	}
}

//---------------------------------------------------------------------------------------------------------------

router.get("/", async (req, res) => {
	const {user_id} = req.query
	if (user_id) {
		const existe = await exist_owner(user_id)
		if (existe) {
			const query = await cart_model.find({
				user_id: mongoose.Types.ObjectId(user_id),
			})
			res.status(200).json(query)
		} else {
			res.status(404).json({message: "Not found, user_id doesn't exist"})
		}
	} else {
		res.status(400).json({message: "user_id is empty"})
	}
})

router.post("/", async (req, res) => {
	const {product_id, user_id} = req.body
	if (product_id && user_id) {
		const user_exist = await exist_owner(user_id)
		const post_exist = await exist_post(product_id)
		if (user_exist && post_exist) {
			try {
				const doc = new cart_model({user_id, post_id: product_id})
				await doc.save()
				res.status(200).json(doc)
			} catch (e) {
				console.log(e)
				res.status(500).json({message: "server error"})
			}
		} else {
			res.status(400).json({message: "product_id or user_id doesn't exists"})
		}
	} else {
		res.status(406).json({message: "Bad product_id or user_id"})
	}
})

router.delete("/", async (req, res) => {
	const {item_id} = req.query
	if (item_id) {
		const existe = exist_item(item_id)
		if (existe) {
			try {
				const query = await cart_model.findByIdAndDelete(item_id)
				res.status(200).json({message: "Deleted"})
			} catch (e) {
				res.status(500).json({message: "Server error"})
			}
		} else {
			res.status(404).json({message: "item_id doesn't exist"})
		}
	} else {
		res.status(400).json({message: "Doesn't exist item_id"})
	}
})

module.exports = router
