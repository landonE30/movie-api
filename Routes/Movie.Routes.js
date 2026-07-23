import e from "express";
import { CreateMovie, DeleteMovie, ShowAllMovies, ShowMovie, UpdateMovie } from "../Controllers/MovieController.js";
import { Auth } from "../Middlewares/Auth.js";
import {Admin} from "../Middlewares/admin.js"
import { Validate } from "../Middlewares/Validation.js";
import { CreateMovieSchema } from "../Schema/Movies/CreateMovie.Schema.js";
import { GetMovieSchema } from "../Schema/Movies/GetMovie.schema.js";
import { UpdateMovieSchema } from "../Schema/Movies/UpdateMovie.Schema.js";
import { DeleteMovieSchema } from "../Schema/Movies/DeleteMovie.Schema.js";
import { CreateReview, UpdateReview } from "../Controllers/ReviewController.js";
import { CreateReviewSchema } from "../Schema/Reviews/CreateReview.Schema.js";


const Route = e.Router()

Route.get('/' ,ShowAllMovies)
Route.get('/:slug', Validate(GetMovieSchema) , ShowMovie)
Route.post('/:slug/review' , Auth , Validate(CreateReviewSchema) , CreateReview)
Route.patch('/:slug/review' , Auth , Validate(CreateReviewSchema) , UpdateReview)
Route.post('/create' , Auth , Admin , Validate(CreateMovieSchema) , CreateMovie)
Route.post('/update/:id', Auth, Admin , Validate(UpdateMovieSchema) , UpdateMovie)
Route.delete('/delete/:id',Auth, Admin , Validate(DeleteMovieSchema) , DeleteMovie)



export default Route