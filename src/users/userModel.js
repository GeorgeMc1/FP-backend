const mongoose = require("mongoose");

const useSchema = new mongoose.Schema({
    firstname:{
        type: String,
        require: true
    },
    lastname: {
        type: String
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})
const User = mongoose.model("user", userSchema);
module.exports = User;