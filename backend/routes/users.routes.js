const express = require("express");
const userController = require("../controllers/user.controller");
const router = express.Router();


router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUser);
router.post("/", userController.userCreate);
router.delete("/:id", userController.userDelete);
router.put("/:id", userController.userUpdate);


module.exports = router;