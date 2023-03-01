const usersRouter = require("express").Router();
const bcrypt = require("bcrypt");

const User = require("../models/User");

usersRouter.get("/", async(request, response)=>{
    const users = await User.find({}).populate("articles", {title:1, desc:1});
    response.json(users);
});

usersRouter.post("/", async (request, response)=>{
    const {username, password} = request.body;

    if(await User.findOne({username})){
        return response.status(400).json({error: "username must be unique"});
    }
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({username, passwordHash});

    const savedUser = await user.save();
    return response.status(201).json(savedUser);
});

module.exports = usersRouter;
