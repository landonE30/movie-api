import mongoose from "mongoose";
import MovieModel from "./Movie.js";
const { Schema } = mongoose;

const Review = new Schema ({
    user : {type : mongoose.Schema.Types.ObjectId , ref : 'User' , required : true},
    movie : {type : mongoose.Schema.Types.ObjectId , ref : 'Movie' , required : true},
    rating : {type : Number },
    review : {type : String }
})


Review.index({ user: 1, movie: 1 }, { unique: true });


Review.pre('findOneAndUpdate' , async function() {

    const oldreview = await this.model.findOne(this.getQuery())

    const movie = await MovieModel.findOne({_id : oldreview.movie})

    const newreview = this.getUpdate()

    const oldrate = oldreview.rating
    const newrate = newreview.rating

    console.log(newrate);
    console.log(oldrate);

    
    if(oldrate != newrate) {

        const rate = newrate - oldrate

        movie.rating = ((movie.rating * (movie.reviewCount)) + (rate)) / movie.reviewCount

        movie.save() 
    }



})

Review.post('save' , async function (doc) {


    const movie = await MovieModel.findOne({_id : doc.movie})

    movie.reviewCount += 1;

    movie.rating = ((movie.rating * (movie.reviewCount - 1)) + doc.rating) / movie.reviewCount


    movie.save()
    
})



Review.post('findOneAndDelete' , async function(doc) {

     const movieid = doc.movie

     const movie = await MovieModel.findOne({_id : movieid})

    movie.reviewCount -= 1

    movie.rating = movie.reviewCount == 0 ? 0 : ((movie.rating * (movie.reviewCount + 1)) - this.rating) / movie.reviewCount

    movie.save()
})



export default new mongoose.model("Review" , Review)