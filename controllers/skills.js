const skillsRouter = require("express").Router();

const Skill = require("../models/Skill");
const logger = require("../utils/logger");

skillsRouter.get("/", async (request, response) => {
	const allSkills = await Skill.find({});
	response.status(200).send(allSkills);
});

skillsRouter.get("/:id", async (request, response)=>{
	const skill = await Skill.findOne({_id: request.params.id});

	response.status(200).send(skill);
	});

skillsRouter.post("/", async(request, response)=>{
	const body = request.body;
	if(!body){
		return response.status(400).json({error: "content missing"});
	}
	const skill = new Skill(body);
	const savedSkill = await skill.save(); 
	response.status(201).send(savedSkill);
	}
);
skillsRouter.delete("/:id", async(request, response)=>{
	await Skill.deleteOne({_id:request.params.id});
	response.status(204).end();
});


module.exports = skillsRouter;
