// Server Instantiate
const express = require("express");
const app = express();

// ENV Variables
require("dotenv").config();
const PORT = process.env.PORT || 3000;

const cookieParser = require("cookie-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const session = require("express-session");
const passport = require("./config/passport");

app.use(cookieParser());

app.use(cors({
  origin: [
    "https://ecomzy-shop-full-stack.vercel.app",
    "http://localhost:5173"
  ],
  credentials: true,
}));

// Session middleware (required by Passport, even though we use JWT for auth)
app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

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
const adminRoutes = require("./routes/adminRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const chatRoutes = require("./routes/chatRoutes");
const googleAuthRoutes = require("./routes/googleAuthRoutes");

// Mounting
app.use("/api/v1", user);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/analytics", analyticsRoutes);
app.use("/api/v1/chat", chatRoutes);
app.use("/api/v1/auth", googleAuthRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});