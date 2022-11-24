const express = require("express");
const router = express.Router();
const {getAllEmployees, getByID, editByID, deleteByID, editSalary, getAllEmployeesCurrent} = require("../controllers/AdminController");

router.get("/getAllEmployees", getAllEmployees);
router.get("/getByID", getByID);
router.get("/editByID", editByID);
router.get("/deleteByID", deleteByID);
router.get("/editSalary", editSalary);
router.get("/getAllEmployeesCurrent", getAllEmployeesCurrent);

module.exports = router;
