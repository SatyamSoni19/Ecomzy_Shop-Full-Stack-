const express = require("express");
const router = express.Router();

const { chat } = require("../controllers/chatController");

// POST /api/v1/chat
router.post("/", chat);

module.exports = router;
