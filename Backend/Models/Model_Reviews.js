const mongoose = require("mongoose")
const {Schema} = mongoose

const CreateReview = new Schema(
	{
		user_id: {type: mongoose.Types.ObjectId, ref: "user", required: true},
		product_id: {type: mongoose.Types.ObjectId, ref: "post", required: true},
		rating: {type: Number, min: 0, max: 5, required: true},
		description: {type: String, required: true},
	},
	{versionKey: false}
)

const review_model = mongoose.model("reviews", CreateReview)

module.exports = review_model
