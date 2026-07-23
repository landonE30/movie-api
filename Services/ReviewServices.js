import { ApiError } from "../ApiError.js"
import MovieModel from "../Models/Movie.js"
import ReviewModel from "../Models/Review.js"

export const GetAllReviews = async() => {

    const AllReviews = await ReviewModel.find({})
        .populate({path : 'movie', select : 'title'})
        .populate({path : 'user' , select : ['username']})

    return AllReviews
}

export const GetReview = async(id) => {

    const review = await ReviewModel.findOne({_id : id})

    if (!review) throw new ApiError(404 , 'review not found')

    return review

}

export const MakeReview = async(user , slug , rating , review) => {

    const movie = await MovieModel.findOne({slug})

    if(!movie) throw new ApiError(404, 'movie not found')

    const movieid = movie._id;


    const newreview = await ReviewModel.create({
        user,
        movie : movieid,
        rating,
        review
    })

    return newreview

}

export const ChangeReview = async(user , slug , rating , review) => {

    const movie = await MovieModel.findOne({slug})

    if(!movie) throw new ApiError(404 , 'movie not found')

    const movieid = movie._id;

    const oldreview = await ReviewModel.findOne({user , movie : movieid})

    if(!oldreview) throw new ApiError(404 , "review not found")

    if (rating == undefined || rating == null || rating == 0) {
        throw new ApiError(422 , 'invalid input')
    }else {
        
    }


    const oldReview = ReviewModel.findOneAndUpdate(oldreview , {rating , review})

    return oldReview

}

export const DeleteReviewById = async(reviewId , userid) => {

    console.log(reviewId);

    const review = ReviewModel.findOne({_id : reviewId})

    if (!review) throw new ApiError(404, 'review not found')

    //if (review.user != userid) throw new ApiError(401 , 'acces denied')

    console.log(review.user);

    const deletedreview = await ReviewModel.findOneAndDelete({_id : reviewId})

    return deletedreview
} 
