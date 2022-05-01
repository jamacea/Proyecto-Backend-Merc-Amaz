const mongoose = require("mongoose")
const post_model = require("./Model_post")
const {Schema} = mongoose

const CreateCart = new Schema(
	{
		user_id: {type: mongoose.Types.ObjectId, ref: "user", required: true},
		post_id: {type: mongoose.Types.ObjectId, ref: "post", required: true},
	},
	{versionKey: false}
)

const cart_model = mongoose.model("cart", CreateCart)

module.exports = cart_model
