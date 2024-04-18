const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    language: {
        type: String,
       
    },
    movie_url: {
        type: String,
    },
    release_date: {
        type: String,
    },
    thumbnail: {
        type: String,
    },
    rating:{
        type:String,
    },
    duration:{
        type:String
    },
    genre:{
        type:String
    },
},{timestamps:true});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
