const loginRouter = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const getToken = require("./tokenHelper");

loginRouter.post("/",
    async (req, res) => {
        const {username, password} = req.body;

        const user = await User.findOne({username});
        const correctPassword = (user === null)
            ? false
            : await bcrypt.compare(password, user.passwordHash);

        if (!correctPassword) {
            return res
                .status(401)
                .json({error: "incorrect username or password"});
        }

        const toTokenize = {
            username: user.username,
            id: user._id
        };

        const token = jwt.sign(toTokenize, process.env.SECRET, {expiresIn: 60 * 60});

        return res
            .status(200)
            .send({token, username: user.username});

    });

//implement it.
loginRouter.post("/tokenValid", async(request, response)=>{
    const token = getToken(request);
    if(!token){
        return response.status(401).json({error: "missing token"});
    }

    const decodedToken = jwt.verify(token, process.env.SECRET);
    if(!decodedToken){
        return response.status(401).json({error: "invalid token"});
    }

    const user = await User.findOne({_id: decodedToken.id});

    return response.status(200).send(user);

});

module.exports = loginRouter;
