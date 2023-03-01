const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true
		},
        desc:{
            type: String,
            required: true
        },
		image:{
			type: String,
			required: true
		},
		content: {
			type: String,
			required: true
		},
		createdAt: {
			type: Date,
			immutable: true,
			default: ()=>Date.now(),
		},
		updatedAt: {
			type: Date,
			default: ()=>Date.now(),
		},
		author:{
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true
		}
	}
);

module.exports = mongoose.model("Article", articleSchema);

