// Server Instantiate
const express = require("express");
const app = express();

// ENV Variables
require("dotenv").config();
const PORT = process.env.PORT || 3000;

const cors = require("cors");
app.use(cors());

// Middlewares
app.use(express.json());

// Import Routes
const user = require("./routes/user");
// Mounting
app.use("/api/v1", user);

// Connect to DataBase
const dbconnect = require("./config/database");
dbconnect();

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});