const config = require("../config/config");
const jwt = require("jsonwebtoken");

exports.loggedIn = function (req, res, next) {
   // let token = req.headers('Authorization');
   // let token = req.header('auth-token');
     //const token = req.cookies.token;// Hetah hi chuan kan cookie options zwang zawng a lang tel thin aaa
     let token = req.cookies['token'];// Hetah ve thung erawh .cookie value chiah a lang ang


    if (!token) return res.status(401).send("Access Denied");

    try {
        if (token.startsWith('Bearer ')) {
            // Remove Bearer from string
            token = token.slice(7, token.length).trimLeft();
        }
        const verified = jwt.verify(token, config.TOKEN_SECRET); 

        if( verified.user_type_id === 2 ){ // Check authorization, 2 = Customer, 1 = Admin
            let req_url = req.baseUrl+req.route.path;
            if(req_url.includes("users/:id") && parseInt(req.params.id) !== verified.id){
                return res.status(401).send("Unauthorized!");
            }
        }
        req.user = verified;
        next();
    }
    catch (err) {
        res.status(400).send("Invalid Token");
    }
}

exports.adminOnly = async function (req, res, next) {
    if( req.user.user_type_id === 0 ){
        return res.status(401).send("Unauthorized!");
    }  
    next();
}

exports.IsUser = async (req, res, next) => {
    if (req.user.user_type_id === 0) {
        next();
    }
    return res.status(401).send("Unauthorized!");   
}
exports.IsAdmin = async (req, res, next) => {
    if (req.user.user_type_id === 0) {
        next();
    }
    return res.status(401).send("Unauthorized!");

}
