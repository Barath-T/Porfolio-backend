const detailsRouter = require("express").Router();

const Details = require("../models/Details");

detailsRouter.get("/", async(request, response)=>{
	const details = await Details.findOne({});

	response.status(200).send(details);
});

detailsRouter.put("/", async(request, response)=>{
	
	const updated = await Details.updateOne({}, request.body, {
		runValidators: true,
	});
	response.status(200).json(updated);
});

module.exports = detailsRouter;
