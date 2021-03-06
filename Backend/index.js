const express = require("express")
let app = express()
const {mongoose} = require("./database")

app.use(express.json(50))
//----------------------------------------CORS------------------------------------------------------

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*")
	res.header("Access-Control-Allow-Headers", "*")
	if (req.method === "OPTIONS") {
		res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET")
		return res.status(200).json({})
	}
	next()
})
//----------------------------------Base de datos------------------------------------------------------------

app.get("/", async (req, res) => {
	res.send("todo bien")
})
//---------------------------------------Imports---------------------------------------------------------------

const Users = require("./Servicios/User")
const Post = require("./Servicios/Post")
const Cart = require("./Servicios/Cart")
const History = require("./Servicios/History")
const Reviews = require("./Servicios/Reviews")
//--------------------------------------Servicios---------------------------------------------------------
app.use("/users", Users)
app.use("/posts", Post)
app.use("/cart", Cart)
app.use("/history", History)
app.use("/reviews", Reviews)
//--------------------------------------Puerto---------------------------------------------------------

app.listen(8080)
