const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    tmdbId: {
      type: String,
      unique: true,
      sparse: true,
    },
    title: {
      type: String,
      required: true,
    },
    overview: String,
    posterPath: String,
    backdropPath: String,
    releaseDate: Date,
    voteAverage: Number,
    voteCount: Number,
    genres: [String],
    cast: [String],
    keywords: [String],
    runtime: Number,
    originalLanguage: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Movie", movieSchema);
