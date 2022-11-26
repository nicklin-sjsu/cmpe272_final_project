const express = require("express");
const router = express.Router();
const {getAllEmployees, getByID, editByID, deleteByID, editSalary, getAllEmployeesCurrent, getEmployeesCurrentSorted} = require("../controllers/AdminController");

router.get("/getAllEmployees", getAllEmployees);
router.get("/getByID", getByID);
router.get("/editByID", editByID);
router.get("/deleteByID", deleteByID);
router.get("/editSalary", editSalary);
router.get("/getAllEmployeesCurrent", getAllEmployeesCurrent);
router.get("/getEmployeesCurrentSorted", getEmployeesCurrentSorted);

module.exports = router;
