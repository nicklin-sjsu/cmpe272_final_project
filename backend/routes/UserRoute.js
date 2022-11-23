const express = require("express");
const router = express.Router();
const {getEmployeeCount, getByID, getByDepartment, getDepartments, editByID, getDepartmentsManagers} = require("../controllers/UserController");

router.get("/getEmployeeCount", getEmployeeCount);
router.get("/getByID", getByID);
router.get("/getByDepartment", getByDepartment);
router.get("/getDepartments", getDepartments);
router.get("/getDepartmentsManagers", getDepartmentsManagers);
router.get("/editByID", editByID);

module.exports = router;