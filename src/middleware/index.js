const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../users/userModel");

exports.hashPass = async (req, res, next) => {
    if(req.body.password || req.body.key == "password"){
        try{
            if(req.body.key){
                req.body.value = await bcrypt.hash(req.body.value, 10);
            } else {
                req.body.password = await bcrypt.hash(req.body.password, 10);
            }
            next();
        } catch(error){
            console.log(error);
            res.status(500).send({error: error.message});
        }
    } else {
        next();
    }
}