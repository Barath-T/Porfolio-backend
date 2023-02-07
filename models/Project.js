const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	tagLine: {
		type: String,
		required: true
	},
	quick: {
		type:String,
		required: true
	},
	year: {
		type: Number,
		required: true
	},
	description: [
			{
				type: String,
				required: true
			}
	],
	tools: [
		{
			_id:false,
			name: {
				type: String,
				required: true
			},
			img:{
				type: String,
				required: true
			}
		}
	],
	imgs: [
		{
		_id: false,
		name:{
			type:String,
			required: true
		},
		img:{
			type: String,
			required: true
		}
	}
	]
});

module.exports = mongoose.model("Project", projectSchema);

