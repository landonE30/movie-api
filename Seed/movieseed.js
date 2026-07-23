import mongoose from "mongoose";
import Movie from "../Models/Movie.js";
import dotenv from "dotenv";
dotenv.config()

const movies = [
  {
    title: "Inception",
    director: "Christopher Nolan",
    overview:
      "A thief who steals corporate secrets through dream-sharing technology is given a chance to erase his criminal history.",
    genres: ["Sci-Fi", "Thriller"],
    releaseyear: 2010,
  },
  {
    title: "The Dark Knight",
    director: "Christopher Nolan",
    overview:
      "Batman faces the Joker, a criminal mastermind who wants to plunge Gotham into chaos.",
    genres: ["Action", "Crime", "Drama"],
    releaseyear: 2008,
  },
  {
    title: "Interstellar",
    director: "Christopher Nolan",
    overview:
      "A team of explorers travel through a wormhole in space to ensure humanity's survival.",
    genres: ["Sci-Fi", "Adventure", "Drama"],
    releaseyear: 2014,
  },
  {
    title: "Fight Club",
    director: "David Fincher",
    overview:
      "An insomniac office worker forms an underground fight club with a soap salesman.",
    genres: ["Drama"],
    releaseyear: 1999,
  },
  {
    title: "Pulp Fiction",
    director: "Quentin Tarantino",
    overview:
      "The lives of two mob hitmen, a boxer, and others intertwine in tales of violence and redemption.",
    genres: ["Crime", "Drama"],
    releaseyear: 1994,
  },
];


const seedMovies = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);

    
    await Movie.deleteMany();

    await Movie.insertMany(movies);

    console.log("Movies seeded successfully");

    process.exit();
  } catch (err) {
    console.error("Seed error:", err);
  }
};

seedMovies();