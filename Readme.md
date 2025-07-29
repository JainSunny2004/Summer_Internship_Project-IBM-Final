# Movie Recommendation System 🎬

A modern, full-stack movie recommendation platform built with Node.js, Express, MongoDB, and enhanced with beautiful UI/UX design.

## 🚀 Features

### 🔐 User Authentication

- **User Registration & Login** with secure password hashing (bcrypt)
- **Session Management** with MongoDB session storage
- **User Profiles** with movie preferences and statistics
- **Guest Browsing** support for anonymous users

### 🎥 Movie System

- **Movie Browsing** with advanced filtering (genre, search, rating)
- **Movie Details** pages with professional Netflix-style UI
- **Rich Movie Data** including cast, keywords, ratings, and genres
- **Similar Movies** recommendations based on genre and keywords

### 🎯 Smart Recommendations

- **Personalized Recommendations** for logged-in users based on preferences
- **Contextual Filtering** by genre, cast, keywords, and ratings
- **Anonymous Recommendations** for guest users
- **Intelligent Fallback System** (TMDB API → Mock Data)

### 💾 Data Management

- **User Watch History** tracking
- **Movie Rating System** with interactive star ratings
- **User Preferences** (favorite genres, actors, keywords)
- **MongoDB Integration** with Mongoose ODM

### 🎨 Modern UI/UX

- **Responsive Design** that works on all devices
- **Tailwind CSS + Flowbite** for modern styling
- **Gradient Designs** and smooth animations
- **Interactive Elements** with hover effects and micro-animations
- **Professional Movie Cards** with detailed information display

## 🛠️ Tech Stack

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB Atlas** - Cloud database
- **Mongoose** - MongoDB ODM
- **EJS** - Template engine
- **bcryptjs** - Password hashing
- **express-session** - Session management

### Frontend

- **Tailwind CSS** - Utility-first CSS framework
- **Flowbite** - Component library
- **Vanilla JavaScript** - Interactive functionality
- **EJS Templates** - Server-side rendering

### External APIs

- **TMDB API** - Movie data source (with mock data fallback)

## 📁 Project Structure

```
movie-recommendation-system/
├── controllers/
│ ├── authController.js                     # User authentication logic
│ ├── movieController.js                    # Movie CRUD operations
│ └── recommendationController.js           # Recommendation engine
├── models/
│ ├── User.js                               # User schema
│ ├── Movie.js                              # Movie schema
│ └── Rating.js                             # Rating schema
├── routes/
│ ├── auth.js                               # Authentication routes
│ ├── movies.js # Movie routes
│ └── recommendations.js                    # Recommendation routes
├── views/
│ ├── index.ejs                             # Homepage
│ ├── movies.ejs                            # Movie browsing page
│ ├── movie-details.ejs                     # Individual movie page
│ ├── recommendations.ejs                   # Recommendations page
│ ├── login.ejs                             # Login page
│ ├── signup.ejs                            # Registration page
│ ├── profile.ejs                           # User profile page
│ └── partials/
│ ├── header.ejs                            # Navigation header
│ ├── footer.ejs                            # Footer
│ └── movieCard.ejs                         # Reusable movie card
├── utils/
│ ├── mockData.js                           # 12 rich mock movies
│ └── recommendationEngine.js               # Recommendation algorithms
├── config/
│ ├── database.js                           # MongoDB connection
│ └── tmdb.js                               # TMDB API configuration
├── middleware/
│ └── auth.js                               # Authentication middleware
├── public/
│ ├── css/
│ │ └── style.css                           # Custom CSS
│ └── js/
│ └── main.js                               # Client-side JavaScript
└── server.js                               # Main application file
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account
- TMDB API key (optional - has mock data fallback)

### Installation

1.  **Clone the repository**

    `git clone <repository-url>`

    `cd movie-recommendation-system`

2.  **Install dependencies**
    `npm install`

3.  **Set up environment variables**

    Create a `.env` file in the root directory:

    ```
    NODE_ENV=development
    PORT=3000
    MONGODB_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/movie-recommendation
    SESSION_SECRET=your-super-secret-session-key-here
    TMDB_API_KEY=your-tmdb-api-key-here
    TMDB_BASE_URL=https://api.themoviedb.org/3
    TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p/w500
    ```

4.  **Start the application**
    `npm run dev`

5.  **Open your browser**
    Navigate to `http://localhost:3000`

## 📱 Pages & Routes

### Public Routes

- **`/`** - Homepage with featured movies
- **`/movies`** - Browse all movies with filters
- **`/movies/:id`** - Individual movie details
- **`/recommendations`** - Movie recommendations
- **`/auth/login`** - User login
- **`/auth/signup`** - User registration

### Protected Routes (Require Login)

- **`/auth/profile`** - User profile and preferences
- **`/auth/logout`** - User logout

### API Endpoints

- **`POST /movies/rate`** - Rate a movie
- **`POST /movies/watch`** - Add to watch history
- **`GET /movies/api/search`** - Search movies
- **`GET /recommendations/api`** - Get recommendations

## 🎯 Key Features Implemented

### ✅ Working Features

- **User Authentication** (signup, login, logout, profiles)
- **Movie Browsing** with working filters (genre, search, rating)
- **Movie Details** with beautiful professional UI
- **Database Integration** (MongoDB Atlas connected)
- **Session Management** with persistent sessions
- **Responsive Design** that works on all devices
- **Mock Data System** with 12 rich movies

### 🧪 Ready for Testing

- **TMDB API Integration** (configured, waiting for API key activation)
- **Rating System** (backend complete, frontend interactive)
- **Recommendation Engine** (algorithms implemented)
- **User Preferences** (profile management system)

## 💡 Mock Data

The system includes 12 carefully curated movies with rich metadata:

- The Shawshank Redemption, The Dark Knight, Pulp Fiction
- 3 Idiots, Inception, Dangal, The Godfather
- Forrest Gump, The Matrix, Interstellar, Sholay, Avengers: Endgame

Each movie includes:

- Complete cast information
- Multiple genres
- Keywords and themes
- High-quality placeholder images
- Realistic ratings and vote counts

## 🔧 Configuration

### Environment Variables

- **`MONGODB_URI`** - MongoDB connection string
- **`SESSION_SECRET`** - Secret key for session encryption
- **`TMDB_API_KEY`** - TMDB API key (optional)
- **`PORT`** - Application port (default: 3000)

### Database Setup

The application uses MongoDB Atlas with the following collections:

- **`users`** - User accounts and preferences
- **`sessions`** - User session data
- **`movies`** - Movie data (when using database storage)
- **`ratings`** - User movie ratings

## 🎨 UI/UX Highlights

- **Interactive Movie Cards** with hover effects
- **Professional Movie Details** pages with backdrop heroes
- **Star Rating System** with smooth animations
- **Responsive Grid Layouts** for all screen sizes
- **Toast Notifications** for user feedback
- **Loading States** and error handling
- **Dark Mode Support** ready

## 🚀 Production Ready

The application is 90% production-ready with:

- Proper error handling and fallbacks
- Security best practices (password hashing, session management)
- Responsive design for all devices
- Professional UI/UX design
- Scalable architecture with MVC pattern
- Database integration and optimization

## 📈 Future Enhancements

- TMDB API integration testing
- Advanced recommendation algorithms
- User movie lists and favorites
- Social features (reviews, sharing)
- Admin panel for content management
- Performance optimizations and caching



## 🙏 Acknowledgments

- [TMDB](https://www.themoviedb.org/) for movie data API
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Flowbite](https://flowbite.com/) for beautiful UI components
- [MongoDB Atlas](https://www.mongodb.com/atlas) for cloud database services

---

**Built with ❤️ using Node.js, Express, MongoDB, and modern web technologies**
