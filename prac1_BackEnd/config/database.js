// Import Mongoose
const mongoose = require("mongoose");

// dotenv
require("dotenv").config();

// Function -> db connect
const dbconnect = () => {

    mongoose.connect(process.env.DATABASE_URL)
    .then(() => {console.log("DataBase Connected Successfully")})
    .catch((error) => {
        console.log(error.message);
        process.exit(1);
    })

}

module.exports = dbconnect;