const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	quick: {
		type: String,
		required: true
	},
	description: [{
		type: String,
		required: true,
	}],
	tools: [
		{
		 _id: false,
		 name: {
			 type: String,
			 required: true,
		 },
		 img: {
			 type: String,
			 required: true,
		 },
		}
	],
});

module.exports = mongoose.model("Skill", skillSchema);
