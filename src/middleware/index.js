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

exports.checkPass = async (req, res, next) => {
    try{
        req.user = await User.findOne({uesrname: req.body.username});
        if(req.user && await bcrypt.compare(req.body.password, req.user.password)){
            console.log("password is correct");
            next();
        } else {
            throw new Error("incorrect username or password");
        }
    } catch(error){
        console.log(error);
        res.status(500).send({error: error.message});
    }
}

exports.checkToken = async (req, res, next) => {
    try{
        if(!req.header("Authorization")){
            console.log("no token passed");
            throw new Error("no token passed");
        }
        const token = req.header("Authorization").replace("Bearer ", "");
        const decodedToken = await jwt.verify(token, procss.env.SECRET);
        req.user = await User.findByIf(decodedToken._id);
        if(req.user){
            req.authUser = req.user;
            next();
        } else {
            throw new Error("user is not authorised");
        }
    } catch(error){
        console.log(error);
        res.status(500).send({error: error.message});
    }
}