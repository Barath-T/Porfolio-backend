const mongoose = require("mongoose");

const detailsSchema = new mongoose.Schema({
	phone: {
		type: String,
		required: true
	},
	mail: {
		type: String,
		required: true
	},
	github: {
		type: String,
		required: true
	},
	linkedin: {
		type: String,
		required: true
	},
});

module.exports = mongoose.model("Details", detailsSchema);
