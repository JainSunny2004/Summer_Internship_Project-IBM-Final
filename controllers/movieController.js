const tmdbService = require('../config/tmdb');
const mockData = require('../utils/mockData');
const User = require('../models/User');

class MovieController {
  async getFeaturedMovies() {
    try {
      // Only try TMDB if API key exists and is not placeholder
      if (process.env.TMDB_API_KEY && 
          process.env.TMDB_API_KEY !== 'your-tmdb-api-key-here' && 
          process.env.TMDB_API_KEY.trim() !== '') {
        console.log('Fetching featured movies from TMDB API...');
        return await tmdbService.getPopularMovies();
      }
      console.log('Using mock data for featured movies - TMDB API key not configured');
      return mockData.getFeaturedMovies();
    } catch (error) {
      console.error('Error fetching featured movies, falling back to mock data:', error.message);
      return mockData.getFeaturedMovies();
    }
  }

  async showMovies(req, res) {
    try {
      const { genre, search, page = 1 } = req.query;
      let movies = [];
      let genres = [];

      console.log('=== MOVIE CONTROLLER DEBUG ===');
      console.log('Received filters:', { genre, search, page });

      // Check if TMDB API is available
      if (process.env.TMDB_API_KEY && 
          process.env.TMDB_API_KEY !== 'your-tmdb-api-key-here' && 
          process.env.TMDB_API_KEY.trim() !== '') {
        
        try {
          console.log('Fetching from TMDB API...');
          genres = await tmdbService.getGenres();
          
          if (search && search.trim()) {
            movies = await tmdbService.searchMovies(search.trim(), page);
          } else if (genre && genre.trim()) {
            // For TMDB, convert genre name to ID if needed
            const genreObj = genres.find(g => 
              g.name.toLowerCase() === genre.toLowerCase() || 
              g.id.toString() === genre.toString()
            );
            const genreId = genreObj ? genreObj.id : genre;
            movies = await tmdbService.getMoviesByGenre(genreId, page);
          } else {
            movies = await tmdbService.getPopularMovies(page);
          }
        } catch (tmdbError) {
          console.error('TMDB API error, falling back to mock data:', tmdbError.message);
          // Fallback to mock data
          genres = mockData.getGenres();
          movies = mockData.getMoviesByFilters({ genre, search });
        }
      } else {
        // Use mock data
        console.log('Using mock data for movies');
        genres = mockData.getGenres();
        
        // Debug: Show available genres
        console.log('Available genres:', genres.map(g => g.name));
        
        // CORRECTED: Pass the exact filter values
        const filters = {};
        if (genre && genre.trim()) filters.genre = genre.trim();
        if (search && search.trim()) filters.search = search.trim();
        
        console.log('Applying filters to mock data:', filters);
        movies = mockData.getMoviesByFilters(filters);
      }

      console.log(`Final result: ${movies.length} movies found`);
      console.log('=== END DEBUG ===');

      res.render('movies', {
        title: 'Movies',
        movies: movies || [],
        genres: genres || [],
        currentGenre: genre || null,
        currentSearch: search || null,
        currentPage: parseInt(page)
      });
    } catch (error) {
      console.error('Movies page error:', error);
      res.render('movies', {
        title: 'Movies',
        movies: [],
        genres: [],
        currentGenre: null,
        currentSearch: null,
        currentPage: 1
      });
    }
  }

  async showMovieDetails(req, res) {
    try {
      const { id } = req.params;
      let movie = null;

      // Check if TMDB API is available
      if (process.env.TMDB_API_KEY && 
          process.env.TMDB_API_KEY !== 'your-tmdb-api-key-here' && 
          process.env.TMDB_API_KEY.trim() !== '') {
        
        try {
          console.log(`Fetching movie details for ID ${id} from TMDB...`);
          movie = await tmdbService.getMovieDetails(id);
        } catch (tmdbError) {
          console.error('TMDB API error, trying mock data:', tmdbError.message);
          movie = mockData.getMovieById(id);
        }
      } else {
        // Use mock data
        console.log(`Using mock data for movie ID ${id}`);
        movie = mockData.getMovieById(id);
      }

      if (!movie) {
        req.flash('error', 'Movie not found');
        return res.redirect('/movies');
      }

      // Get similar movies for recommendations
      let similarMovies = [];
      try {
        if (process.env.TMDB_API_KEY && 
            process.env.TMDB_API_KEY !== 'your-tmdb-api-key-here' && 
            process.env.TMDB_API_KEY.trim() !== '') {
          // Could implement TMDB similar movies here
          similarMovies = mockData.getSimilarMovies(id, 4);
        } else {
          similarMovies = mockData.getSimilarMovies(id, 4);
        }
      } catch (error) {
        console.error('Error fetching similar movies:', error);
        similarMovies = [];
      }

      res.render('movie-details', {
        title: movie.title,
        movie,
        similarMovies
      });
    } catch (error) {
      console.error('Movie details error:', error);
      req.flash('error', 'Error loading movie details');
      res.redirect('/movies');
    }
  }

  async rateMovie(req, res) {
    try {
      if (!req.session.user) {
        return res.status(401).json({ 
          success: false, 
          error: 'Authentication required' 
        });
      }

      const { movieId, rating, title } = req.body;
      const userId = req.session.user.id;

      // Validate rating
      if (!rating || rating < 1 || rating > 10) {
        return res.status(400).json({ 
          success: false, 
          error: 'Rating must be between 1 and 10' 
        });
      }

      if (!movieId) {
        return res.status(400).json({ 
          success: false, 
          error: 'Movie ID is required' 
        });
      }

      try {
        // Update user's ratings in database
        const user = await User.findById(userId);
        if (!user) {
          return res.status(404).json({ 
            success: false, 
            error: 'User not found' 
          });
        }

        const existingRatingIndex = user.ratings.findIndex(r => r.movieId === movieId.toString());

        if (existingRatingIndex > -1) {
          user.ratings[existingRatingIndex].rating = parseFloat(rating);
          user.ratings[existingRatingIndex].ratedAt = new Date();
        } else {
          user.ratings.push({
            movieId: movieId.toString(),
            rating: parseFloat(rating),
            ratedAt: new Date()
          });
        }

        await user.save();
        console.log(`User ${userId} rated movie ${movieId} with ${rating} stars`);

        res.json({ 
          success: true, 
          message: 'Rating saved successfully',
          rating: parseFloat(rating)
        });
      } catch (dbError) {
        console.error('Database error while saving rating:', dbError);
        res.status(500).json({ 
          success: false, 
          error: 'Error saving rating to database' 
        });
      }
    } catch (error) {
      console.error('Rating error:', error);
      res.status(500).json({ 
        success: false, 
        error: 'Error saving rating' 
      });
    }
  }

  async addToWatchHistory(req, res) {
    try {
      if (!req.session.user) {
        return res.status(401).json({ 
          success: false, 
          error: 'Authentication required' 
        });
      }

      const { movieId, title } = req.body;
      const userId = req.session.user.id;

      if (!movieId) {
        return res.status(400).json({ 
          success: false, 
          error: 'Movie ID is required' 
        });
      }

      try {
        const user = await User.findById(userId);
        if (!user) {
          return res.status(404).json({ 
            success: false, 
            error: 'User not found' 
          });
        }
        
        // Check if movie is already in watch history
        const existingIndex = user.watchHistory.findIndex(w => w.movieId === movieId.toString());
        
        if (existingIndex > -1) {
          // Update watch time
          user.watchHistory[existingIndex].watchedAt = new Date();
          console.log(`Updated watch time for movie ${movieId} for user ${userId}`);
        } else {
          // Add to watch history
          user.watchHistory.push({
            movieId: movieId.toString(),
            title: title || 'Unknown Title',
            watchedAt: new Date()
          });
          console.log(`Added movie ${movieId} to watch history for user ${userId}`);
        }

        await user.save();

        res.json({ 
          success: true, 
          message: 'Added to watch history' 
        });
      } catch (dbError) {
        console.error('Database error while updating watch history:', dbError);
        res.status(500).json({ 
          success: false, 
          error: 'Error updating watch history in database' 
        });
      }
    } catch (error) {
      console.error('Watch history error:', error);
      res.status(500).json({ 
        success: false, 
        error: 'Error updating watch history' 
      });
    }
  }

  // Get user's watch history
  async getWatchHistory(req, res) {
    try {
      if (!req.session.user) {
        return res.status(401).json({ 
          success: false, 
          error: 'Authentication required' 
        });
      }

      const user = await User.findById(req.session.user.id);
      if (!user) {
        return res.status(404).json({ 
          success: false, 
          error: 'User not found' 
        });
      }

      // Sort by most recent first
      const watchHistory = user.watchHistory
        .sort((a, b) => new Date(b.watchedAt) - new Date(a.watchedAt))
        .slice(0, 20); // Limit to last 20 movies

      res.json({ 
        success: true, 
        watchHistory 
      });
    } catch (error) {
      console.error('Get watch history error:', error);
      res.status(500).json({ 
        success: false, 
        error: 'Error fetching watch history' 
      });
    }
  }

  // Get user's ratings
  async getUserRatings(req, res) {
    try {
      if (!req.session.user) {
        return res.status(401).json({ 
          success: false, 
          error: 'Authentication required' 
        });
      }

      const user = await User.findById(req.session.user.id);
      if (!user) {
        return res.status(404).json({ 
          success: false, 
          error: 'User not found' 
        });
      }

      // Sort by most recent first
      const ratings = user.ratings
        .sort((a, b) => new Date(b.ratedAt) - new Date(a.ratedAt))
        .slice(0, 20); // Limit to last 20 ratings

      res.json({ 
        success: true, 
        ratings 
      });
    } catch (error) {
      console.error('Get user ratings error:', error);
      res.status(500).json({ 
        success: false, 
        error: 'Error fetching user ratings' 
      });
    }
  }

  // Search movies with enhanced functionality
  async searchMovies(req, res) {
    try {
      const { q, page = 1, limit = 20 } = req.query;
      
      if (!q || q.trim().length < 2) {
        return res.json({
          success: false,
          error: 'Search query must be at least 2 characters long'
        });
      }

      let movies = [];

      // Check if TMDB API is available
      if (process.env.TMDB_API_KEY && 
          process.env.TMDB_API_KEY !== 'your-tmdb-api-key-here' && 
          process.env.TMDB_API_KEY.trim() !== '') {
        
        try {
          movies = await tmdbService.searchMovies(q.trim(), page);
        } catch (tmdbError) {
          console.error('TMDB search error, using mock data:', tmdbError.message);
          movies = mockData.searchMovies(q.trim());
        }
      } else {
        // Use mock data
        movies = mockData.searchMovies(q.trim());
      }

      // Apply limit
      const startIndex = (page - 1) * limit;
      const paginatedMovies = movies.slice(startIndex, startIndex + parseInt(limit));

      res.json({
        success: true,
        movies: paginatedMovies,
        total: movies.length,
        page: parseInt(page),
        totalPages: Math.ceil(movies.length / limit)
      });
    } catch (error) {
      console.error('Search movies error:', error);
      res.status(500).json({ 
        success: false, 
        error: 'Error searching movies' 
      });
    }
  }

  // Get movies by genre
  async getMoviesByGenre(req, res) {
    try {
      const { genreId } = req.params;
      const { page = 1, limit = 20 } = req.query;
      let movies = [];

      if (!genreId) {
        return res.status(400).json({
          success: false,
          error: 'Genre ID is required'
        });
      }

      // Check if TMDB API is available
      if (process.env.TMDB_API_KEY && 
          process.env.TMDB_API_KEY !== 'your-tmdb-api-key-here' && 
          process.env.TMDB_API_KEY.trim() !== '') {
        
        try {
          movies = await tmdbService.getMoviesByGenre(genreId, page);
        } catch (tmdbError) {
          console.error('TMDB genre movies error, using mock data:', tmdbError.message);
          movies = mockData.getMoviesByGenre(genreId);
        }
      } else {
        // Use mock data
        movies = mockData.getMoviesByGenre(genreId);
      }

      // Apply limit for mock data
      const startIndex = (page - 1) * limit;
      const paginatedMovies = movies.slice(startIndex, startIndex + parseInt(limit));

      res.json({
        success: true,
        movies: paginatedMovies,
        genre: genreId,
        page: parseInt(page),
        total: movies.length,
        totalPages: Math.ceil(movies.length / limit)
      });
    } catch (error) {
      console.error('Get movies by genre error:', error);
      res.status(500).json({ 
        success: false, 
        error: 'Error fetching movies by genre' 
      });
    }
  }
}

module.exports = new MovieController();
