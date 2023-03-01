const projectRouter = require("express").Router();

const Project = require("../models/Project");


projectRouter.get("/", async(request, response)=>{
	const allProjects = await Project.find({});
	response.status(200).send(allProjects);
});

projectRouter.get("/:id", async(request, response)=>{
	const project = await Project.findOne({_id: request.params.id});

	response.status(200).send(project);
});

projectRouter.post("/", async(request, response)=>{
	const body = request.body;

	if(!body)
		return response.status(400).json({error: "content missing"});

	const project = new Project(body);
	const savedProject = await project.save();

	response.status(201).send(savedProject);
});

projectRouter.delete("/:id", async(request, response)=>{
	await Project.deleteOne({_id: request.params.id});
	response.status(204).end();
});

module.exports = projectRouter;

