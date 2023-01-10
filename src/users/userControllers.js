const User = require("./userModel");
const jwt = require("jsonwebtoken");

exports.deleteUser = async (req, res) => {
    try{
        await User.deleteOne({username: req.body.username});
        res.status(202).send({message: `${req.body.username} has been deleted`});
    } catch(error){
        console.log(error);
        res.status(500).send({error: error.message});
    }
}