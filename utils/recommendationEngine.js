const tmdbService = require('../config/tmdb');
const mockData = require('./mockData');

class RecommendationEngine {
  async getPersonalizedRecommendations(user, filters = {}) {
    try {
      // Get user's preferences and history
      const userGenres = user.preferences?.genres || [];
      const userActors = user.preferences?.actors || [];
      const userKeywords = user.preferences?.keywords || [];
      const userRatings = user.ratings || [];
      const watchHistory = user.watchHistory || [];

      // Get all available movies
      let allMovies = [];
      if (process.env.TMDB_API_KEY) {
        // Try to get movies from TMDB based on user preferences
        if (userGenres.length > 0) {
          const genreMovies = await Promise.all(
            userGenres.slice(0, 3).map(genre => {
              const genreId = this.getGenreId(genre);
              return genreId ? tmdbService.getMoviesByGenre(genreId) : [];
            })
          );
          allMovies = genreMovies.flat();
        } else {
          allMovies = await tmdbService.getPopularMovies();
        }
      } else {
        allMovies = mockData.getAllMovies();
      }

      // Apply contextual filters
      allMovies = this.applyFilters(allMovies, filters);

      // Remove movies user has already watched
      const watchedMovieIds = watchHistory.map(w => w.movieId);
      allMovies = allMovies.filter(movie => !watchedMovieIds.includes(movie.id.toString()));

      // Score movies based on user preferences
      const scoredMovies = allMovies.map(movie => ({
        ...movie,
        personalizedScore: this.calculatePersonalizedScore(movie, user)
      }));

      // Sort by personalized score
      scoredMovies.sort((a, b) => b.personalizedScore - a.personalizedScore);

      return scoredMovies.slice(0, 12);
    } catch (error) {
      console.error('Personalized recommendations error:', error);
      return this.getContextualRecommendations(filters);
    }
  }

  async getContextualRecommendations(filters = {}) {
    try {
      let movies = [];

      if (process.env.TMDB_API_KEY) {
        if (filters.genre) {
          const genreId = this.getGenreId(filters.genre);
          movies = genreId ? await tmdbService.getMoviesByGenre(genreId) : await tmdbService.getPopularMovies();
        } else {
          movies = await tmdbService.getPopularMovies();
        }
      } else {
        movies = mockData.getAllMovies();
      }

      // Apply filters
      movies = this.applyFilters(movies, filters);

      // Sort by rating and popularity
      movies.sort((a, b) => b.vote_average - a.vote_average);

      return movies.slice(0, 12);
    } catch (error) {
      console.error('Contextual recommendations error:', error);
      return mockData.getRandomMovies(12);
    }
  }

  applyFilters(movies, filters) {
    let filtered = [...movies];

    if (filters.genre) {
      filtered = filtered.filter(movie => 
        movie.genres?.some(g => g.toLowerCase().includes(filters.genre.toLowerCase())) ||
        movie.genre_ids?.includes(this.getGenreId(filters.genre))
      );
    }

    if (filters.cast) {
      filtered = filtered.filter(movie => 
        movie.cast?.some(actor => actor.toLowerCase().includes(filters.cast.toLowerCase()))
      );
    }

    if (filters.keywords) {
      filtered = filtered.filter(movie => 
        movie.keywords?.some(keyword => keyword.toLowerCase().includes(filters.keywords.toLowerCase())) ||
        movie.overview?.toLowerCase().includes(filters.keywords.toLowerCase())
      );
    }

    if (filters.minRating) {
      filtered = filtered.filter(movie => movie.vote_average >= filters.minRating);
    }

    if (filters.maxRating) {
      filtered = filtered.filter(movie => movie.vote_average <= filters.maxRating);
    }

    return filtered;
  }

  calculatePersonalizedScore(movie, user) {
    let score = movie.vote_average || 0;

    // Boost score based on genre preferences
    if (user.preferences?.genres) {
      const genreMatch = user.preferences.genres.some(prefGenre => 
        movie.genres?.some(movieGenre => 
          movieGenre.toLowerCase().includes(prefGenre.toLowerCase())
        )
      );
      if (genreMatch) score += 2;
    }

    // Boost score based on actor preferences
    if (user.preferences?.actors) {
      const actorMatch = user.preferences.actors.some(prefActor => 
        movie.cast?.some(movieActor => 
          movieActor.toLowerCase().includes(prefActor.toLowerCase())
        )
      );
      if (actorMatch) score += 1.5;
    }

    // Boost score based on keyword preferences
    if (user.preferences?.keywords) {
      const keywordMatch = user.preferences.keywords.some(prefKeyword => 
        movie.keywords?.some(movieKeyword => 
          movieKeyword.toLowerCase().includes(prefKeyword.toLowerCase())
        ) || movie.overview?.toLowerCase().includes(prefKeyword.toLowerCase())
      );
      if (keywordMatch) score += 1;
    }

    // Boost newer movies slightly
    if (movie.release_date) {
      const releaseYear = new Date(movie.release_date).getFullYear();
      const currentYear = new Date().getFullYear();
      if (currentYear - releaseYear <= 5) {
        score += 0.5;
      }
    }

    return score;
  }

  getGenreId(genreName) {
    const genreMap = {
      'action': 28,
      'adventure': 12,
      'animation': 16,
      'comedy': 35,
      'crime': 80,
      'documentary': 99,
      'drama': 18,
      'family': 10751,
      'fantasy': 14,
      'history': 36,
      'horror': 27,
      'music': 10402,
      'mystery': 9648,
      'romance': 10749,
      'science fiction': 878,
      'sci-fi': 878,
      'tv movie': 10770,
      'thriller': 53,
      'war': 10752,
      'western': 37
    };

    return genreMap[genreName.toLowerCase()];
  }
}

module.exports = new RecommendationEngine();

