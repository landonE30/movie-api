import { ChangeMovie, DestroyMovie, GetAllMovies, GetMovie, MakeMovie } from "../Services/MovieServices.js";


export const ShowAllMovies = async(req , res) => {

    const query = req.query


    if ('title' in query) {

        const title = query.title

        query.title = {'$regex' : title, '$options' : 'i'}
    }

    if ('director' in query) {

        const director = query.director

        query.director = {'$regex' : director, '$options' : 'i'}
    }

    const Allmovies = await GetAllMovies(query)

    res.status(200).json({
        message : "all movies fetched succesfully",
        data : Allmovies
    })
    
};

export const ShowMovie = async(req , res) => {

    const slug = req.params.slug;

    const movie = await GetMovie(slug)

    res.status(200).json({
        message : 'movie fetched succesfully',
        data : movie
    })

}

export const CreateMovie = async(req , res) => {

    const {title , director , overview , genres , releaseyear } = req.body;

    const newmovie = await MakeMovie(title , director , overview , genres , releaseyear)

    res.status(200).json({
        message : 'movie created succesfully',
        data : newmovie
    })

}

export const UpdateMovie = async(req , res) => {

    const id = req.params.id

    const {title , director , overview , genres , releaseyear } = req.body;

    const changedmovie = await ChangeMovie(id , title , director , overview , genres , releaseyear);

    res.status(200).json({
        message : 'updated succesfully',
        data : changedmovie
    })

}

export const DeleteMovie = async(req , res) => {

    const id = req.params.id

    const deletedmovie = await DestroyMovie(id)

    res.status(200).json({
        message : 'movie deleted succesfully',
        data : deletedmovie
    })    
}