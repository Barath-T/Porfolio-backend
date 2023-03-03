
function getToken(req){
    const authorization = req.get("Authorization");
    console.log(authorization.toLowerCase().startsWith("bearer "));
    if(authorization && authorization.toLowerCase().startsWith("bearer ")){
        return authorization.substring(7);
    }
    return null;
}

module.exports = getToken;
