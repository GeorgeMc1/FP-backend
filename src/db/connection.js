require("dotenv").config();
const mongoose = require ("mongoose");

const connection = async () => {
    try{
        mongoose.connect(process.env.MONGOURI);
    } catch(error){
        console.log(error);
    }
}