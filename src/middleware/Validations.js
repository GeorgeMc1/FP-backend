const User = require("../users/userModel");

exports.matchEmail = async (req, res, next) => {
	try {
		// find the user in the data base
		const filter = { username: req.body.username };
		const userObj = await User.findOne(filter);

		console.log("the user found is:", userObj); //test

		if (userObj && req.body.email === userObj.email) {
			console.log("the email is corect");
			next();
		} else {
			// throw an error if entered email does not match the email in the data base
			throw Error("incorect username or password");
		}
	} catch (error) {
		console.log(error);
		res.status(500).send({ error: error.message });
	}
};

exports.verifyEmail = async (req, res, next) => {
	if(req.body.key == "email" || req.body.email){
		try {
			const reg = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(\.?)$/;
			let email;
            if(req.body.key){
                email = req.body.value;
            } else {
                email = req.body.email;
            }
			if (reg.test(email)) {
				console.log("the emails format is valid");
				next();
			} else {
				// throw an error if entered emails format is not valid
				throw Error("please enter a valid email");
			}
		} catch (error) {
			console.log(error);
			res.status(500).send({ error: error.message });
		}
	} else {
		next();
	}
};

exports.verifyPassword = async (req, res, next) => {
	if(req.body.key == "password" || req.body.password){
		try {
			const reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
			let pass;
			if(req.body.key){
				pass = req.body.value;
			} else {
				pass = req.body.password;
			}
			if (reg.test(pass)) {
				console.log("the passwords format is valid");
				next();
			} else {
				// throw an error if entered emails format is not valid
				throw Error("please enter a valid password");
			}
		} catch (error) {
			console.log(error);
			res.status(500).send({ error: error.message });
		}
	} else {
		next();
	}
};