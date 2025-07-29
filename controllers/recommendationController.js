const recommendationEngine = require('../utils/recommendationEngine');
const User = require('../models/User');

class RecommendationController {
  async showRecommendations(req, res) {
    try {
      const {
        genre,
        cast,
        keywords,
        minRating,
        maxRating
      } = req.query;

      const filters = {
        genre,
        cast,
        keywords,
        minRating: minRating ? parseFloat(minRating) : null,
        maxRating: maxRating ? parseFloat(maxRating) : null
      };

      let recommendations = [];

      if (req.session.user) {
        // Get personalized recommendations for logged-in users
        try {
          const user = await User.findById(req.session.user.id);
          recommendations = await recommendationEngine.getPersonalizedRecommendations(user, filters);
        } catch (error) {
          console.error('Error getting personalized recommendations:', error);
          recommendations = await recommendationEngine.getContextualRecommendations(filters);
        }
      } else {
        // Get contextual recommendations for anonymous users
        recommendations = await recommendationEngine.getContextualRecommendations(filters);
      }

      res.render('recommendations', {
        title: 'Recommendations',
        recommendations: recommendations || [],
        filters: filters || {},
        isPersonalized: !!req.session.user
      });
    } catch (error) {
      console.error('Recommendations error:', error);
      res.render('recommendations', {
        title: 'Recommendations',
        recommendations: [],
        filters: {},
        isPersonalized: false
      });
    }
  }

  async getRecommendationsAPI(req, res) {
    try {
      const filters = req.query;
      let recommendations = [];

      if (req.session.user) {
        try {
          const user = await User.findById(req.session.user.id);
          recommendations = await recommendationEngine.getPersonalizedRecommendations(user, filters);
        } catch (error) {
          console.error('Error getting personalized recommendations:', error);
          recommendations = await recommendationEngine.getContextualRecommendations(filters);
        }
      } else {
        recommendations = await recommendationEngine.getContextualRecommendations(filters);
      }

      res.json({
        success: true,
        recommendations: recommendations || [],
        isPersonalized: !!req.session.user
      });
    } catch (error) {
      console.error('API recommendations error:', error);
      res.status(500).json({
        success: false,
        error: 'Error fetching recommendations'
      });
    }
  }
}

module.exports = new RecommendationController();
