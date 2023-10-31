const express = require("express")
const listUser = require("../controller/listUser")
const getUser = require("../controller/getUser")
const updateUser = require("../controller/updateUser")
const deleteUser = require("../controller/deleteUser")
const createUser = require("../controller/createUser")

const router = express.Router()


router.get("/listUser",listUser)
router.get("/getUser/:id",getUser)
router.patch("/updateUser/:id",updateUser)
router.delete("/deleteUser/:id",deleteUser)
router.post("/createUser",createUser)

module.exports =  router