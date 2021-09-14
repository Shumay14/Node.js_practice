const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.get("/NFTCard", (req, res) => {
  res.render("NFTCard");
});

// in case, code will not work
module.exports = router;
