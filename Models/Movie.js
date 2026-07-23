import mongoose from "mongoose";
const {Schema} = mongoose;

const Movie = new Schema({
    title : {type : String , required : true , trim : true},
    slug : {type:String , unique : true},
    director : {type : String , required : true},
    overview : {type : String , required : true},
    genres : {type : Array , required : true},
    releaseyear : {type : Number , required : true},
    reviewCount : {type : Number , default : 0},
    rating : {type : Number , default : 0},
},  {strictPopulate : false }  )


Movie.pre('save' , async function() {

    if(!this.slug)
        {const sluged = (this.title.toLowerCase()+this.releaseyear).replaceAll(/[: ?*.!?]+/ig , m => '-')
            this.slug = sluged
        }

})


Movie.pre('insertMany' , async function(movie) {

    movie.forEach(m => {

        m.slug = (m.title.toLowerCase()+m.releaseyear).replaceAll(/[: ?*.!?]+/ig , m => '-')

    })
    
        

})

export default mongoose.model('Movie' , Movie)