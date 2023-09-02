const express = require("express")
const router = express.Router()

const userController = require("../controller/UserController")

router.post("/register", userController.registerUser)
router.post("/login", userController.userLogin)
router.get("/", userController.getDataUser)
router.get("/:id", userController.getUserByID)

module.exports = router