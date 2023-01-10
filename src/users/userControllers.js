const jwt = require("jsonwebtoken");
const User = require("./userModel");

exports.createAccount = async (req, res) => {
	try {
		await User.create(req.body);
		res.status(201).send({
			success: true,
			message: `User with username ${req.body.username} has been successfully created `
		});
	} catch (error) {
		console.log(error);
		// send internal error status and the error message
		res.status(400).send({ success: false, error: error.message });
	}
};

exports.deleteUser = async (req, res) => {
    try{
        await User.deleteOne({username: req.body.username});
        res.status(202).send({message: `${req.body.username} has been deleted`});
    } catch(error){
        console.log(error);
        res.status(500).send({error: error.message});
    }
}

exports.loginUser = async (req, res) => {
    try{
        if (req.authUser) {
            console.log("token check passwed and continue to persistant login");
            res.staus(200).send({username: req.authUser.username});
        }
        const token = await jwt.sign({id_: req.user._id}, process.env.SECRET);
        res.status(200).send({username: req.user.username, token});
    } catch(error){
        console.log(error);
        res.status(500).send({error: error.message});
    }
}