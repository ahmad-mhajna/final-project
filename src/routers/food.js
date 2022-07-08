const express = require("express");
const {
  getAllFoods,
  newFood,
  editFood,
  deletefood,
} = require("../controllers/food");
const auth = require("../middleware/auth");

const router = new express.Router();

router.get("/foods", getAllFoods);

router.post("/foods", auth, newFood);

router.put("/foods", auth, editFood);

router.delete("/foods", auth, deletefood);

module.exports = router;
