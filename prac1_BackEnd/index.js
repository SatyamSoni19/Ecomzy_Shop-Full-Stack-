// Server Instantiate
const express = require("express");
const app = express();

// ENV Variables
require("dotenv").config();
const PORT = process.env.PORT || 3000;

const cookieParser = require("cookie-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");

app.use(cookieParser());

app.use(cors({
  origin: [
    "https://ecomzy-shop-full-stack.vercel.app",
    "http://localhost:5173"
  ],
  credentials: true,
}));

// Middlewares
app.use(express.json());

app.use(fileUpload());

// Connect to DataBase
const dbconnect = require("./config/database");
dbconnect();

const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();

// Import Routes
const user = require("./routes/user");
// Mounting
app.use("/api/v1", user);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});