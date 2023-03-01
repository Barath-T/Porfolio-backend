const articlesRouter = require("express").Router();
const jwt = require("jsonwebtoken");

const Article = require("../models/Article");
const User = require("../models/User");

articlesRouter.get("/", async (req, res)=>{
    const articles = await Article.find({}).populate("author", {username: 1, articles: 1});

    return res.status(200).json(articles);
});

articlesRouter.get("/:id", async (req, res)=>{
    const article = await Article.findOne({_id: req.params.id});
    return article
        ? res.status(200).json(article)
        : res.status(404).end();
})

articlesRouter.post("/", async (req, res)=>{
    const {title, desc, image, content } = req.body;

    const token = getToken(req);
    if(!token){
        return res.status(401).json({error: "missing token"});
    }
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if(!decodedToken){
        return res.status(401).json({error: "invalid token"});
    }
    console.log("decoded: ", decodedToken.id);
    const user = await User.findOne({_id: decodedToken.id});

    console.log("from db: ", user._id);
    const article = new Article({
        title, desc, image, content, author: user._id
    });

    const savedArticle = await article.save();

    user.articles = user.articles.concat(savedArticle._id);
    await user.save();

    return res.status(201).send(savedArticle);

});

articlesRouter.put("/:id", async(req, res)=>{
    const article = await Article.findOne({_id: req.params.id});
    if(!article){
        return res.status(404).json({error:"article not found to update"});
    }

    return res.send(200).json({error: "cant update"});

});

articlesRouter.delete("/:id", async(req, res)=>{
   await Article.deleteOne({_id: req.params.id});
   return res.status(204).end();
});
module.exports = articlesRouter;

function getToken(req){
    const authorization = req.get("authorization");
    if(authorization && authorization.toLowerCase().startsWith("bearer ")){
        return authorization.substring(7);
    }
    return null;
}
