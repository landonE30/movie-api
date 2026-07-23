import express from 'express'
import { Errorhandler } from './Middlewares/Errorhandler.js';

import UserRoutes from './Routes/Users.Routes.js'
import MovieRoutes from './Routes/Movie.Routes.js'
import ReviewRoutes from './Routes/Review.Routes.js'

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get("/", (req, res) => {
  res.json({
    message: "Movie API is running",
    version: "1.0.0",
    status: "OK",
    endpoints: {
      movies: "/movies",
      users: "/users",
      reviews: "/review"
    }
  });
});

app.use("/user" , UserRoutes)
app.use('/movie' , MovieRoutes)
app.use('/review' , ReviewRoutes)


app.use((req, res, next) => {
  res.status(404).json({
    status : 404,
    message: "not found"
  });
});


app.use(Errorhandler)

export default app