// authorize user info.
const express = require("express");

const userController = require("../controllers/usercontroller");

const router = express.Router();

const multer = require("multer");

const upload = multer({
  storage: "uploads/",
});

// submit the form to user info
router.post("/register", userController.register);
router.post("/profile", upload.single("image"), userController.uploadImage);

// in case, code will not work
module.exports = router;
