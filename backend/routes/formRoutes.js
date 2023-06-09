const express = require("express");
const { postform, getData } = require("../controllers/formController");
const router = express.Router();

router.post("/form", postform);
router.get("/form/:id", getData);

module.exports = router;
