const express = require("express");

const authController = require("../controllers/authcontroller");

const router = express.Router();

// submit the form to auth
router.post("/register", authController.register);

// in case, code will not work
module.exports = router;
