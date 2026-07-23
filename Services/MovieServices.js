import { ApiError } from "../ApiError.js";
import MovieModel from "../Models/Movie.js";

export const GetAllMovies = async(query) => {

    const Allmovies = await MovieModel.find(query);

    return Allmovies
}



export const GetMovie = async(slug) =>{

    const movie = await MovieModel.findOne({slug})

    if(!movie) throw new ApiError(404 , "movie not found")

    return movie
}

export const MakeMovie = async(title , director , overview , genres , releaseyear) => {

    const newmovie = await MovieModel.create({
        title ,
        director ,
        overview ,
        genres ,
        releaseyear
    })

    await newmovie.save()

    return newmovie
}


export const ChangeMovie = async(id,title , director , overview , genres , releaseyear) => {

    const updated = await MovieModel.findOneAndUpdate({_id : id} , {title , director , overview , genres , releaseyear} , {new:true})

    return updated

}

export const DestroyMovie = async(id) =>{

    const movie = await MovieModel.findOneAndDelete({_id : id})

    return movie


}