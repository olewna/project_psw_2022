const express = require("express");
const {
  getMusic,
  createMusic,
  deleteMusic,
  updateMusic,
} = require("../controllers/musicController.js");

const router = express.Router();

//GET all music
router.get("/", getMusic);

// POST new music
router.post("/", createMusic);

// DELETE music
router.delete("/:id", deleteMusic);

// UPDATE music
router.patch("/:id", updateMusic);

module.exports = router;
