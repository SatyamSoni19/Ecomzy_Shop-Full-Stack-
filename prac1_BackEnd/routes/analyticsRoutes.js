const express = require("express");
const router = express.Router();
const { recordView } = require("../controllers/analyticsController");

router.post("/view", recordView);

module.exports = router;
