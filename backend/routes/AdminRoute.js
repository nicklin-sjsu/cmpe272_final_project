const express = require("express");
const router = express.Router();
const {
    getAllEmployees, getByID, editByID, deleteByID, editSalary, getAllEmployeesCurrent, getEmployeesCurrentSorted,
    addEmpDept, removeEmpDept, addEmpTitle, removeEmpTitle
} = require("../controllers/AdminController");

router.get("/getAllEmployees", getAllEmployees);
router.get("/getByID", getByID);
router.get("/editByID", editByID);
router.get("/deleteByID", deleteByID);
router.get("/editSalary", editSalary);
router.get("/getAllEmployeesCurrent", getAllEmployeesCurrent);
router.get("/getEmployeesCurrentSorted", getEmployeesCurrentSorted);
router.get("/addEmpDept", addEmpDept);
router.get("/removeEmpDept", removeEmpDept);
router.get("/addEmpTitle", addEmpTitle);
router.get("/removeEmpTitle", removeEmpTitle);

module.exports = router;
