const mongoose = require("mongoose")
const express = require("express")
const history_model = require("../Models/Model_history")
const router = express.Router()
const user_model = require("../Models/Model_user")
//---------------------------------------------------Funcionalidades------------------------------------------------------------

const exist_user = async (user_id) => {
	const query = await user_model.findById(user_id)
	console.log(query)
	if (query !== null) {
		return Object.keys(query).length !== 0
	} else {
		return false
	}
}
const exist_history = async (user_id) => {
	const query = await history_model.findOne({
		user_id: mongoose.Types.ObjectId(user_id),
	})
	console.log(query)
	if (query !== null) {
		return Object.keys(query).length !== 0
	} else {
		return false
	}
}
//------------------------------------------------------Peticiones--------------------------------------------------------------

router.get("/:user_id", async (req, res) => {
	const {user_id} = req.params
	if (user_id) {
		const exist__user = await exist_user(user_id)
		if (exist__user) {
			const exist__history = await exist_history(user_id)
			if (exist__history) {
				try {
					const query = await history_model.findOne({user_id})
					res.status(200).json(query)
				} catch (e) {
					console.log(e)
					res.status(500).json({message: "Server error"})
				}
			} else {
				res.status(404).json({message: "History not found"})
			}
		} else {
			res.status(404).json({message: "User_id not found"})
		}
	} else {
		res.status(400).json({message: "Add an user_id"})
	}
})
//----------------------------------------------------------Exports-------------------------------------------------------------

module.exports = router
