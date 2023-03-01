const loginRouter = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

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

        const token = await jwt.sign(toTokenize, process.env.SECRET, {expiresIn: 60 * 60});

        return res
            .status(200)
            .send({token, username: user.username});

    });

module.exports = loginRouter;