const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("express-flash");
const methodOverride = require("method-override");
const path = require("path");
require("dotenv").config();

const connectDB = require("./config/database");

// Route imports
const authRoutes = require("./routes/auth");
const movieRoutes = require("./routes/movies");
const recommendationRoutes = require("./routes/recommendations");

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// View engine setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

// Session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
    }),
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  })
);

app.use(flash());

// Global middleware for user session
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  res.locals.messages = req.flash();
  next();
});

// Routes
app.use("/auth", authRoutes);
app.use("/movies", movieRoutes);
app.use("/recommendations", recommendationRoutes);

app.use((req, res, next) => {
  const originalRender = res.render;
  res.render = function(view, locals, callback) {
    console.log(`=== RENDERING VIEW: ${view} ===`);
    return originalRender.call(this, view, locals, callback);
  };
  next();
});

// Home route
app.get("/", async (req, res) => {
  try {
    const movieController = require("./controllers/movieController");
    const featuredMovies = await movieController.getFeaturedMovies();
    res.render("index", {
      title: "Movie Recommendation System",
      featuredMovies,
    });
  } catch (error) {
    console.error("Home route error:", error);
    res.render("index", {
      title: "Movie Recommendation System",
      featuredMovies: [],
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render("error", {
    title: "Error",
    message: "Something went wrong!",
    error: process.env.NODE_ENV === "development" ? err : {},
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).render("error", {
    title: "404 - Page Not Found",
    message: "The page you are looking for does not exist.",
    error: {},
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
