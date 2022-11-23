const express = require("express");
const router = express.Router();
const {getEmployeeCount, getByID, getByDepartment, getDepartments, editByID} = require("../controllers/UserController");

router.get("/getEmployeeCount", getEmployeeCount);
router.get("/getByID", getByID);
router.get("/getByDepartment", getByDepartment);

module.exports = router;