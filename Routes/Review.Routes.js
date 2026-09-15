import e from "express";
import { DeleteReview, ShowAllReviews, ShowReview, } from "../Controllers/ReviewController.js";
import { Auth } from "../Middlewares/Auth.js";


const Route = e.Router()

Route.get('/' , ShowAllReviews)
Route.get('/:id' , ShowReview)
Route.delete('/delete/:id' , Auth , DeleteReview)


export default Route