const mongoose = require("mongoose")
const user_model = require("../Models/Model_user")
const express = require("express")
const router = express.Router()

// display_name: String,
// username: String,
// password: String
//-----------------------------------Funciones y validaciones----------------------------------------------------

const create = (display_name = "", username = "", password = "") => {
	return {
		display_name: display_name,
		username: username,
		password: password,
	}
}

const valido = (sesion) => {
	const {username, password} = sesion
	return Boolean(username && password)
}

const validarusuario = async (username) => {
	const query = await user_model.findOne({username})
	if (query) {
		return Object.keys(query).length == 0 ? true : false
	} else {
		return true
	}
}

const id_exist = async (user_id) => {
	const query = await user_model.findOne({
		user_id: mongoose.Types.ObjectId(user_id),
	})
	return Boolean(query)
}

//-----------------------------------------------------------------------------------------------

router.get("/all", async (req, res) => {
	try {
		const users = await user_model.find()
		res.send(users)
	} catch (e) {
		console.log(e)
	}
})

router.post("/register", async (req, res) => {
	try {
		const {owner_id, display_name, username, password} = req.body
		console.log(username)
		allowed = await validarusuario(username)
		if (allowed) {
			const registrar = create(display_name, username, password)
			const newUser = new user_model(registrar)

			await newUser.save()
			res.status(200).json({message: "Succesfully created"})
		} else {
			res.status(400).json({message: "Already exist, try another username"})
		}
	} catch (e) {
		console.log(e)
	}
})

router.post("/login", async (req, res) => {
	let {username, password} = req.body
	let sesion = {username, password}
	if (valido(sesion)) {
		try {
			const query = await user_model.findOne({username, password})
			res.status(200).json(query)
		} catch (e) {
			console.log(e)
			res.status(400).json({message: e})
		}
	} else {
		res.status(404).json({message: "not found"})
	}
})

router.post("/", async (req, res) => {
	try {
		const {user_id} = req.body
		console.log(user_id)
		const query = await user_model.findById(user_id).exec()
		if (Object.keys(query)) {
			res.status(200).json(query)
		} else {
			res.status(404).json({message: "Doesn't exist that id"})
		}
	} catch (e) {
		console.log("error-----" + e)
		res.status(400).json({message: "Doesn't exist that user_id"})
	}
})

router.get("/prev-login", async (req, res) => {
	const {user_id} = req.query
	if (user_id) {
		const exist = await id_exist(user_id)
		if (exist) {
			try {
				const query = await user_model.findById(user_id)
				res.status(200).json(query)
			} catch (e) {
				res.status(404).json({message: "not found"})
			}
		}
	} else {
		res.status(404).json({message: "user_id not found"})
	}
})

module.exports = router
