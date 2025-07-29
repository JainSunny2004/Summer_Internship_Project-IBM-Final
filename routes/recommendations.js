const express = require('express');
const recommendationController = require('../controllers/recommendationController');

const router = express.Router();

// Main recommendations page
router.get('/', recommendationController.showRecommendations);

// API endpoint for AJAX recommendations
router.get('/api', recommendationController.getRecommendationsAPI);

module.exports = router;
