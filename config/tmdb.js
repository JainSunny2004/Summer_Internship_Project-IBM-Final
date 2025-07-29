const axios = require("axios");

class TMDBService {
  constructor() {
    this.apiKey = process.env.TMDB_API_KEY;
    this.baseURL = process.env.TMDB_BASE_URL;
    this.imageBaseURL = process.env.TMDB_IMAGE_BASE_URL;
    this.client = axios.create({
      baseURL: this.baseURL,
      params: {
        api_key: this.apiKey,
      },
    });
  }

  async getPopularMovies(page = 1) {
    try {
      const response = await this.client.get("/movie/popular", {
        params: { page },
      });
      return this.formatMovies(response.data.results);
    } catch (error) {
      console.error("TMDB API Error:", error);
      return [];
    }
  }

  async searchMovies(query, page = 1) {
    try {
      const response = await this.client.get("/search/movie", {
        params: { query, page },
      });
      return this.formatMovies(response.data.results);
    } catch (error) {
      console.error("TMDB Search Error:", error);
      return [];
    }
  }

  async getMovieDetails(movieId) {
    try {
      const response = await this.client.get(`/movie/${movieId}`);
      return this.formatMovie(response.data);
    } catch (error) {
      console.error("TMDB Movie Details Error:", error);
      return null;
    }
  }

  async getMoviesByGenre(genreId, page = 1) {
    try {
      const response = await this.client.get("/discover/movie", {
        params: {
          with_genres: genreId,
          page,
        },
      });
      return this.formatMovies(response.data.results);
    } catch (error) {
      console.error("TMDB Genre Movies Error:", error);
      return [];
    }
  }

  async getGenres() {
    try {
      const response = await this.client.get("/genre/movie/list");
      return response.data.genres;
    } catch (error) {
      console.error("TMDB Genres Error:", error);
      return [];
    }
  }

  formatMovies(movies) {
    return movies.map((movie) => this.formatMovie(movie));
  }

  formatMovie(movie) {
    return {
      id: movie.id,
      title: movie.title,
      overview: movie.overview,
      poster_path: movie.poster_path
        ? `${this.imageBaseURL}${movie.poster_path}`
        : null,
      backdrop_path: movie.backdrop_path
        ? `${this.imageBaseURL}${movie.backdrop_path}`
        : null,
      release_date: movie.release_date,
      vote_average: movie.vote_average,
      vote_count: movie.vote_count,
      genre_ids: movie.genre_ids || [],
      genres: movie.genres || [],
      runtime: movie.runtime,
      original_language: movie.original_language,
    };
  }
}

module.exports = new TMDBService();
