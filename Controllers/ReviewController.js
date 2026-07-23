
import { ChangeReview, DeleteReviewById, GetAllReviews, GetReview, MakeReview } from "../Services/ReviewServices.js";




export const ShowAllReviews = async(req , res) => {

    const AllReviews = await GetAllReviews()

    res.status(200).json({
        message : 'all reviews fetched succesfully',
        data : AllReviews
    })
    
};

export const ShowReview = async(req , res) => {

    const id = req.params.id

    const review = await GetReview(id)

    res.status(200).json({

        message : 'review fetched succesfully',
        data : review
    })

}

export const CreateReview = async(req , res) => {

    const slug = req.params.slug

    const id = req.user.id;

    const {rating , review} = req.body

    const newreview = await MakeReview(id , slug , rating , review);

    res.status(200).json({

        message : 'review submitted succesfully',
        data : newreview
    })


}

export const UpdateReview = async(req , res) => {

    const userid = req.user.id;

    const slug = req.params.slug;

    const {rating , review} = req.body

    const updatedreview = await ChangeReview(userid , slug , rating , review);
    
    res.status(200).json({
        message : 'update succesfull',
        data : updatedreview
    })
}

export const DeleteReview = async(req , res) => {

    const reviewId = req.params.id

    const userid = req.user.id

    console.log(userid);

    const deletedreview = await DeleteReviewById(reviewId , userid)

    res.status(200).json({
        message : 'review deleted succesfully',
        data : deletedreview
    })
    
}