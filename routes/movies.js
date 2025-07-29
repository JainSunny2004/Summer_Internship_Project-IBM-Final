const express = require('express');
const movieController = require('../controllers/movieController');

const router = express.Router();

// Movie listing page with search and filters
router.get('/', movieController.showMovies);

// Individual movie details page - IMPORTANT: This must come AFTER other specific routes
router.get('/:id', movieController.showMovieDetails);

// API endpoints for AJAX requests
router.post('/rate', movieController.rateMovie);
router.post('/watch', movieController.addToWatchHistory);

module.exports = router;
