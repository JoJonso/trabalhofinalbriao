const express = require('express');
const controller = require('../controllers/gamesController');
const router = express.Router();


router.get('/listGames',controller.listGames);


module.exports = router;