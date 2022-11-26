const express = require("express");
const router = express.Router();
const { searchName, searchNameAdvanced } = require("../controllers/SearchController");

router.get("/searchName", searchName);
router.get("/searchNameAdvanced", searchNameAdvanced); //name, title(optional), dept_no(optional)

module.exports = router;