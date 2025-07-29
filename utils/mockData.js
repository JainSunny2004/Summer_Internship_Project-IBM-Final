const mockMovies = [
  {
    id: '1',
    title: 'The Shawshank Redemption',
    overview: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
    poster_path: 'https://via.placeholder.com/500x750/4F46E5/FFFFFF?text=Shawshank',
    backdrop_path: 'https://via.placeholder.com/1920x1080/4F46E5/FFFFFF?text=Shawshank+Backdrop',
    release_date: '1994-09-23',
    vote_average: 9.3,
    vote_count: 2500000,
    genres: ['Drama', 'Crime'],
    cast: ['Tim Robbins', 'Morgan Freeman'],
    keywords: ['prison', 'friendship', 'hope', 'redemption'],
    runtime: 142,
    original_language: 'en'
  },
  {
    id: '2',
    title: 'The Dark Knight',
    overview: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests.',
    poster_path: 'https://via.placeholder.com/500x750/1F2937/FFFFFF?text=Dark+Knight',
    backdrop_path: 'https://via.placeholder.com/1920x1080/1F2937/FFFFFF?text=Dark+Knight+Backdrop',
    release_date: '2008-07-18',
    vote_average: 9.0,
    vote_count: 2200000,
    genres: ['Action', 'Crime', 'Drama'],
    cast: ['Christian Bale', 'Heath Ledger', 'Aaron Eckhart'],
    keywords: ['superhero', 'batman', 'joker', 'chaos'],
    runtime: 152,
    original_language: 'en'
  },
  {
    id: '3',
    title: 'Pulp Fiction',
    overview: 'The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption.',
    poster_path: 'https://via.placeholder.com/500x750/DC2626/FFFFFF?text=Pulp+Fiction',
    backdrop_path: 'https://via.placeholder.com/1920x1080/DC2626/FFFFFF?text=Pulp+Fiction+Backdrop',
    release_date: '1994-10-14',
    vote_average: 8.9,
    vote_count: 1800000,
    genres: ['Crime', 'Drama'],
    cast: ['John Travolta', 'Uma Thurman', 'Samuel L. Jackson'],
    keywords: ['nonlinear', 'violence', 'redemption', 'crime'],
    runtime: 154,
    original_language: 'en'
  },
  {
    id: '4',
    title: '3 Idiots',
    overview: 'Two friends are searching for their long lost companion. They revisit their college days and recall the memories of their friend.',
    poster_path: 'https://via.placeholder.com/500x750/059669/FFFFFF?text=3+Idiots',
    backdrop_path: 'https://via.placeholder.com/1920x1080/059669/FFFFFF?text=3+Idiots+Backdrop',
    release_date: '2009-12-25',
    vote_average: 8.4,
    vote_count: 350000,
    genres: ['Comedy', 'Drama'],
    cast: ['Aamir Khan', 'R. Madhavan', 'Sharman Joshi'],
    keywords: ['friendship', 'education', 'comedy', 'life-lessons'],
    runtime: 170,
    original_language: 'hi'
  },
  {
    id: '5',
    title: 'Inception',
    overview: 'A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
    poster_path: 'https://via.placeholder.com/500x750/7C3AED/FFFFFF?text=Inception',
    backdrop_path: 'https://via.placeholder.com/1920x1080/7C3AED/FFFFFF?text=Inception+Backdrop',
    release_date: '2010-07-16',
    vote_average: 8.8,
    vote_count: 2100000,
    genres: ['Action', 'Sci-Fi', 'Thriller'],
    cast: ['Leonardo DiCaprio', 'Marion Cotillard', 'Tom Hardy'],
    keywords: ['dreams', 'reality', 'heist', 'mind-bending'],
    runtime: 148,
    original_language: 'en'
  },
  {
    id: '6',
    title: 'Dangal',
    overview: 'Former wrestler Mahavir Singh Phogat and his two wrestler daughters struggle towards glory at the Commonwealth Games.',
    poster_path: 'https://via.placeholder.com/500x750/EA580C/FFFFFF?text=Dangal',
    backdrop_path: 'https://via.placeholder.com/1920x1080/EA580C/FFFFFF?text=Dangal+Backdrop',
    release_date: '2016-12-23',
    vote_average: 8.3,
    vote_count: 180000,
    genres: ['Drama', 'Sport', 'Biography'],
    cast: ['Aamir Khan', 'Fatima Sana Shaikh', 'Sanya Malhotra'],
    keywords: ['wrestling', 'father-daughter', 'sports', 'determination'],
    runtime: 161,
    original_language: 'hi'
  },
  {
    id: '7',
    title: 'The Godfather',
    overview: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
    poster_path: 'https://via.placeholder.com/500x750/8B5CF6/FFFFFF?text=Godfather',
    backdrop_path: 'https://via.placeholder.com/1920x1080/8B5CF6/FFFFFF?text=Godfather+Backdrop',
    release_date: '1972-03-24',
    vote_average: 9.2,
    vote_count: 1700000,
    genres: ['Crime', 'Drama'],
    cast: ['Marlon Brando', 'Al Pacino', 'James Caan'],
    keywords: ['mafia', 'family', 'power', 'loyalty'],
    runtime: 175,
    original_language: 'en'
  },
  {
    id: '8',
    title: 'Forrest Gump',
    overview: 'The presidencies of Kennedy and Johnson, the events of Vietnam, Watergate, and other history unfold through the perspective of an Alabama man.',
    poster_path: 'https://via.placeholder.com/500x750/10B981/FFFFFF?text=Forrest+Gump',
    backdrop_path: 'https://via.placeholder.com/1920x1080/10B981/FFFFFF?text=Forrest+Gump+Backdrop',
    release_date: '1994-07-06',
    vote_average: 8.8,
    vote_count: 1900000,
    genres: ['Drama', 'Romance'],
    cast: ['Tom Hanks', 'Robin Wright', 'Gary Sinise'],
    keywords: ['life', 'destiny', 'love', 'history'],
    runtime: 142,
    original_language: 'en'
  },
  {
    id: '9',
    title: 'The Matrix',
    overview: 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.',
    poster_path: 'https://via.placeholder.com/500x750/EF4444/FFFFFF?text=Matrix',
    backdrop_path: 'https://via.placeholder.com/1920x1080/EF4444/FFFFFF?text=Matrix+Backdrop',
    release_date: '1999-03-31',
    vote_average: 8.7,
    vote_count: 1750000,
    genres: ['Action', 'Sci-Fi'],
    cast: ['Keanu Reeves', 'Laurence Fishburne', 'Carrie-Anne Moss'],
    keywords: ['reality', 'simulation', 'awakening', 'choice'],
    runtime: 136,
    original_language: 'en'
  },
  {
    id: '10',
    title: 'Interstellar',
    overview: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
    poster_path: 'https://via.placeholder.com/500x750/F59E0B/FFFFFF?text=Interstellar',
    backdrop_path: 'https://via.placeholder.com/1920x1080/F59E0B/FFFFFF?text=Interstellar+Backdrop',
    release_date: '2014-11-07',
    vote_average: 8.6,
    vote_count: 1600000,
    genres: ['Adventure', 'Drama', 'Sci-Fi'],
    cast: ['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain'],
    keywords: ['space', 'time', 'love', 'survival'],
    runtime: 169,
    original_language: 'en'
  },
  {
    id: '11',
    title: 'Sholay',
    overview: 'After his family is murdered by a notorious outlaw, a former police officer enlists the services of two outlaws to capture the killer.',
    poster_path: 'https://via.placeholder.com/500x750/F97316/FFFFFF?text=Sholay',
    backdrop_path: 'https://via.placeholder.com/1920x1080/F97316/FFFFFF?text=Sholay+Backdrop',
    release_date: '1975-08-15',
    vote_average: 8.2,
    vote_count: 250000,
    genres: ['Action', 'Adventure', 'Drama'],
    cast: ['Dharmendra', 'Amitabh Bachchan', 'Sanjeev Kumar'],
    keywords: ['revenge', 'friendship', 'village', 'outlaw'],
    runtime: 204,
    original_language: 'hi'
  },
  {
    id: '12',
    title: 'Avengers: Endgame',
    overview: 'After the devastating events of Infinity War, the Avengers assemble once more to reverse Thanos\' actions and restore balance to the universe.',
    poster_path: 'https://via.placeholder.com/500x750/6366F1/FFFFFF?text=Endgame',
    backdrop_path: 'https://via.placeholder.com/1920x1080/6366F1/FFFFFF?text=Endgame+Backdrop',
    release_date: '2019-04-26',
    vote_average: 8.4,
    vote_count: 2000000,
    genres: ['Action', 'Adventure', 'Drama'],
    cast: ['Robert Downey Jr.', 'Chris Evans', 'Mark Ruffalo'],
    keywords: ['superhero', 'time-travel', 'sacrifice', 'teamwork'],
    runtime: 181,
    original_language: 'en'
  }
];

const mockGenres = [
  { id: '1', name: 'Action' },
  { id: '2', name: 'Adventure' },
  { id: '3', name: 'Comedy' },
  { id: '4', name: 'Crime' },
  { id: '5', name: 'Drama' },
  { id: '6', name: 'Sci-Fi' },
  { id: '7', name: 'Thriller' },
  { id: '8', name: 'Sport' },
  { id: '9', name: 'Biography' },
  { id: '10', name: 'Romance' }
];

class MockDataService {
  getFeaturedMovies() {
    // Return top-rated movies for featured section
    return mockMovies
      .sort((a, b) => b.vote_average - a.vote_average)
      .slice(0, 4);
  }

  getAllMovies() {
    return mockMovies;
  }

  getMovieById(id) {
    return mockMovies.find(movie => movie.id === id.toString());
  }

  getGenres() {
    return mockGenres;
  }

  getMoviesByFilters(filters = {}) {
    let filteredMovies = [...mockMovies];

    console.log('Applying filters:', filters); // Debug log
    console.log('Total movies before filtering:', filteredMovies.length);

    // Filter by genre - CORRECTED: Use exact match, case insensitive
    if (filters.genre && filters.genre.trim()) {
      const genreFilter = filters.genre.toLowerCase().trim();
      filteredMovies = filteredMovies.filter(movie => 
        movie.genres.some(g => g.toLowerCase() === genreFilter)
      );
      console.log(`After genre filter (${genreFilter}): ${filteredMovies.length} movies`);
      
      // Debug: Show which movies match
      filteredMovies.forEach(movie => {
        console.log(`- ${movie.title}: ${movie.genres.join(', ')}`);
      });
    }

    // Filter by search term
    if (filters.search && filters.search.trim()) {
      const searchTerm = filters.search.toLowerCase().trim();
      filteredMovies = filteredMovies.filter(movie => 
        movie.title.toLowerCase().includes(searchTerm) ||
        movie.overview.toLowerCase().includes(searchTerm) ||
        movie.cast.some(actor => actor.toLowerCase().includes(searchTerm)) ||
        movie.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm))
      );
      console.log(`After search filter (${searchTerm}): ${filteredMovies.length} movies`);
    }

    // Filter by cast
    if (filters.cast && filters.cast.trim()) {
      const castFilter = filters.cast.toLowerCase().trim();
      filteredMovies = filteredMovies.filter(movie => 
        movie.cast.some(actor => actor.toLowerCase().includes(castFilter))
      );
      console.log(`After cast filter (${castFilter}): ${filteredMovies.length} movies`);
    }

    // Filter by keywords
    if (filters.keywords && filters.keywords.trim()) {
      const keywordFilter = filters.keywords.toLowerCase().trim();
      filteredMovies = filteredMovies.filter(movie => 
        movie.keywords.some(keyword => keyword.toLowerCase().includes(keywordFilter)) ||
        movie.overview.toLowerCase().includes(keywordFilter)
      );
      console.log(`After keyword filter (${keywordFilter}): ${filteredMovies.length} movies`);
    }

    // Filter by minimum rating
    if (filters.minRating && !isNaN(parseFloat(filters.minRating))) {
      const minRating = parseFloat(filters.minRating);
      filteredMovies = filteredMovies.filter(movie => movie.vote_average >= minRating);
      console.log(`After min rating filter (${minRating}): ${filteredMovies.length} movies`);
    }

    // Filter by maximum rating
    if (filters.maxRating && !isNaN(parseFloat(filters.maxRating))) {
      const maxRating = parseFloat(filters.maxRating);
      filteredMovies = filteredMovies.filter(movie => movie.vote_average <= maxRating);
      console.log(`After max rating filter (${maxRating}): ${filteredMovies.length} movies`);
    }

    // Sort by rating (highest first)
    filteredMovies.sort((a, b) => b.vote_average - a.vote_average);

    console.log(`Final filtered movies count: ${filteredMovies.length}`);
    return filteredMovies;
  }

  getRandomMovies(count = 5) {
    const shuffled = [...mockMovies].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  getMoviesByGenre(genreId) {
    // Handle both genre ID and genre name
    let genreName = genreId;
    
    // If it's a numeric ID, find the genre name
    if (!isNaN(genreId)) {
      const genre = mockGenres.find(g => g.id === genreId.toString());
      genreName = genre ? genre.name : genreId;
    }

    return this.getMoviesByFilters({ genre: genreName });
  }

  searchMovies(query) {
    return this.getMoviesByFilters({ search: query });
  }

  getTopRatedMovies(count = 10) {
    return mockMovies
      .sort((a, b) => b.vote_average - a.vote_average)
      .slice(0, count);
  }

  getMoviesByYear(year) {
    return mockMovies.filter(movie => {
      if (!movie.release_date) return false;
      const movieYear = new Date(movie.release_date).getFullYear();
      return movieYear === parseInt(year);
    });
  }

  getRecentMovies(count = 8) {
    return mockMovies
      .filter(movie => movie.release_date)
      .sort((a, b) => new Date(b.release_date) - new Date(a.release_date))
      .slice(0, count);
  }

  // Get movies similar to a given movie based on genre and keywords
  getSimilarMovies(movieId, count = 6) {
    const baseMovie = this.getMovieById(movieId);
    if (!baseMovie) return [];

    return mockMovies
      .filter(movie => movie.id !== movieId)
      .filter(movie => {
        // Check if they share at least one genre
        const sharedGenres = movie.genres.some(genre => 
          baseMovie.genres.includes(genre)
        );
        
        // Check if they share keywords
        const sharedKeywords = movie.keywords.some(keyword => 
          baseMovie.keywords.includes(keyword)
        );

        return sharedGenres || sharedKeywords;
      })
      .sort((a, b) => b.vote_average - a.vote_average)
      .slice(0, count);
  }

  // Get statistics about the mock data
  getStats() {
    const totalMovies = mockMovies.length;
    const avgRating = mockMovies.reduce((sum, movie) => sum + movie.vote_average, 0) / totalMovies;
    const genreCount = {};
    
    mockMovies.forEach(movie => {
      movie.genres.forEach(genre => {
        genreCount[genre] = (genreCount[genre] || 0) + 1;
      });
    });

    const mostPopularGenre = Object.entries(genreCount)
      .sort(([,a], [,b]) => b - a)[0];

    return {
      totalMovies,
      averageRating: avgRating.toFixed(1),
      mostPopularGenre: mostPopularGenre ? mostPopularGenre[0] : 'N/A',
      genreDistribution: genreCount,
      totalGenres: Object.keys(genreCount).length
    };
  }
}

module.exports = new MockDataService();
