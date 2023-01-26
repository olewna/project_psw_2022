const express = require("express");
const {
  getFood,
  createFood,
  deleteFood,
  updateFood,
  getSearchedFood,
} = require("../controllers/foodController.js");

const router = express.Router();

//GET all food
router.get("/", getFood);

//GET searched
router.get("/:nazwa", getSearchedFood);

// POST new Food
router.post("/", createFood);

// DELETE Food
router.delete("/:id", deleteFood);

// UPDATE Food
router.patch("/:id", updateFood);

module.exports = router;
