const express = require("express");
const router = express.Router();

const userAuthControllers = require("../controllers/user");

router.post("/register", userAuthControllers.register);
router.post("/login", userAuthControllers.login);
router.get("/show", userAuthControllers.show);
router.post("/blood_type", userAuthControllers.findUser);
module.exports = router;
