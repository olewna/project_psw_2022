const express = require("express");

const {
  getMusic,
  createMusic,
  deleteMusic,
  updateMusic,
  getSearchedMusic,
} = require("../controllers/musicController.js");

const router = express.Router();

//GET all music
router.get("/", getMusic);

// GET searched
router.get("/:nazwa", getSearchedMusic);

// POST new music
router.post("/", createMusic);

// DELETE music
router.delete("/:id", deleteMusic);

// UPDATE music
router.patch("/:id", updateMusic);

module.exports = router;
