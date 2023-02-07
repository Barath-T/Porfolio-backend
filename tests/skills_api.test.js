const mongoose = require("mongoose");

const Skill = require("../models/Skill");
const Project = require("../models/Project");
const Details = require("../models/Details");

const logger = require("../utils/logger");

const {initialSkills, initialProjects, initialDetails, imgToBase64} = require("./helper.js");

const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);


describe("Skills", () => {
	beforeEach(async () => {
  		logger.info("BE started");
 		await Skill.deleteMany({});
		logger.info("BE deleted");
  		await Skill.insertMany(initialSkills);
  		logger.info("BE inserted");
	});

  logger.info("test started");

  it("two skills exists", async () => {
    const response = await api.get("/api/skills");
    expect(response.body).toHaveLength(initialSkills.length);
  });

  it("one skill can be created", async () => {
    const skillObj = {
      title: "test title 3",
      description: "Lorem ipsum this is third!",
      tools: [
        {
          name: "test tool 1",
          img: imgToBase64("img1.jpg"),
        },
        {
          name: "test tool 2",
          img: imgToBase64("img2.jpg"),
        },
      ],
    };
	await api.post("/api/skills")
		  .send(skillObj)
		  .expect(201)
		  .expect("Content-Type", /application\/json/);

	const allSkills = await Skill.find({}, {tools:{img:0}});
	expect(allSkills).toHaveLength(initialSkills.length + 1);
	expect(allSkills.map(skill=>skill.title)).toContain("test title 3");
    

	});

	it("skill can be found with id", async()=>{
		let id = await Skill.findOne({}, {_id:1});
		id = id._id.toString();
		logger.info("fetched id: ",id);	
		const response = await api.get(`/api/skills/${id}`).expect(200);
		
		expect(response.body._id.toString()).toEqual(id);
	});
	it("skill can be deleted", async()=>{
		let id = await Skill.findOne({}, {_id:1});
		id = id._id.toString();
		logger.info("fetched id: ",id);	
		await api.delete(`/api/skills/${id}`).expect(204);
		
		const allSkills = await Skill.find({});
		expect(allSkills).toHaveLength(initialSkills.length - 1);
	}
	);

});

describe("Projects", ()=>{
	beforeEach(async()=>{
		logger.info("Projects started");
		await Project.deleteMany({});
		logger.info("deleted projects");
		await Project.insertMany(initialProjects);
		logger.info("inserted projects");
	});
	it("projects can be retrieved", async()=>{
		const response = await api.get("/api/projects");
	//	logger.info(response.body);
		expect(response.body).toHaveLength(initialProjects.length);
	});

	it("one project can be created", async()=>{
		const ProjectToAdd = {
			...initialProjects[0], 
			title:"3rd project", 
			description:"Lorem Ipsum this is 3rd Project"
		};
		await api
			.post("/api/projects/")
			.send(ProjectToAdd)
			.expect(201)
			.expect("Content-Type", /application\/json/);
		
		const allProjects = await Project.find({}, {imgs:0, tools:{img:0}});
		expect(allProjects).toHaveLength(initialProjects.length + 1);
		expect(allProjects.map((project)=>project.title)).toContain("3rd project");
	});
	
	it("project can be retrived with id", async()=>{
		let id = await Project.findOne({}, {_id:1});
		id = id._id.toString();

		const response = await api.get(`/api/projects/${id}`).expect(200);

		expect(response.body._id.toString()).toEqual(id);
	});
	it("project can be deleted", async()=>{
		let id = await Project.findOne({}, {_id:1});
		id = id._id.toString();

		await api.delete(`/api/projects/${id}`).expect(204);
		const allProjects = await Project.find({});
		expect(allProjects.map(project=>project._id)).not.toContain(id);
	});
}
);


describe("Details", ()=>{
	beforeEach(async()=>{
		await Details.deleteOne({});
		await Details.create(initialDetails);
	});
	it("can retrieve details", async()=>{
		const response = await api.get("/api/details/");
		const details = await Details.findOne({});
		logger.info(details);
		logger.info(response.body);
		expect(response.body._id.toString()).toEqual(details._id.toString());
	});
	it.only("can be updated", async()=>{
		const mail = "barath1272003@gmail.com";
		await api.put("/api/details/").send({mail}).expect(200);

		const details = await Details.findOne({});
		expect(details.mail).toEqual(mail);
	});

});
		
afterAll(() => {
  mongoose.connection.close();
});
