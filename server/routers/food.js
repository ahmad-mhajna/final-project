const express = require("express");
const {
  getAllFoods,
  newFood,
  editFood,
  deletefood,
} = require("../controllers/food");
const auth = require("../middleware/auth");
const checkPermissions = require("../middleware/checkPermissions");

const router = new express.Router();

router.get("/foods", getAllFoods);

router.post("/foods", newFood);

router.put("/foods/:id", [auth, checkPermissions], editFood);

router.delete("/foods/:id", [auth, checkPermissions], deletefood);

module.exports = router;
