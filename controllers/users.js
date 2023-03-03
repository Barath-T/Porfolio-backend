const usersRouter = require("express").Router();
const bcrypt = require("bcrypt");

const User = require("../models/User");

const getToken = require("./tokenHelper");

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

//implement it.
usersRouter.post("/tokenValid", async(request, response)=>{
    const token = getToken(request.body.token);
    
    if(!token){
        return res.status(401).json({error: "missing token"});
    }

    const decodedToken = jwt.verify(token, process.env.SECRET);
    if(!decodedToken){
        return res.status(401).json({error: "invalid token"});
    }

    const user = await User.findOne({_id: decodedToken.id});

    return response.status(200).send(user);

});
module.exports = usersRouter;
