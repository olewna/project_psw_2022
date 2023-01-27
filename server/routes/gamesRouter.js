const express = require("express");
const {
  getGames,
  createGames,
  deleteGames,
  updateGames,
  getSearchedGames,
} = require("../controllers/gamesController.js");

const router = express.Router();

//GET all games
router.get("/", getGames);

// GET searched
router.get("/:nazwa", getSearchedGames);

// POST new games
router.post("/", createGames);

// DELETE games
router.delete("/:id", deleteGames);

// UPDATE games
router.patch("/:id", updateGames);

module.exports = router;
