const express = require("express");
const router = express.Router();
const { auth, isAdmin } = require("../middlewares/auth");
const { getDashboard, getUsers, getProducts } = require("../controllers/adminController");

router.get("/dashboard", auth, isAdmin, getDashboard);
router.get("/users", auth, isAdmin, getUsers);
router.get("/products", auth, isAdmin, getProducts);

module.exports = router;
