const mongoose = require("mongoose")
const post_model = require("./Model_post")
const {Schema} = mongoose

const CreateHistory = new Schema(
	{
		user_id: {type: mongoose.Types.ObjectId, ref: "user", required: true},
		items: [
			{item: {type: mongoose.Types.ObjectId, ref: "post", required: true}},
		],
	},
	{versionKey: false}
)

const history_model = mongoose.model("history", CreateHistory)

module.exports = history_model
