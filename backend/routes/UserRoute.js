const express = require("express");
const router = express.Router();
const {getEmployeeCount, getByID} = require("../controllers/UserController");

router.get("/getEmployeeCount", getEmployeeCount);
router.get("/getByID", getByID);

module.exports = router;