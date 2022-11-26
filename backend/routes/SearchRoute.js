const express = require("express");
const router = express.Router();
const { searchName } = require("../controllers/SearchController");

router.get("/searchName", searchName);

module.exports = router;