const Movie=require('../models/movie.model')
async function createMovie(req,res){
    console.log(req.body)
    try {
        const myMovie = new Movie(req.body);
        await myMovie.save();
        res.status(201).json({sucess:true, message: "Movie created successfully", movie: myMovie });
    } catch (error) {
        console.error(error);
        res.status(500).json({sucess:false, message: "Internal server error" });
    }
    
}
async function getMovie(req,res){
    try {
        const startIndex=parseInt(req.query.startIndex)||0
        const limit=parseInt(req.query.limit)||9;
        const sortDirection=req.query.order==='asc'?1:-1;
        const language=req.query.ln
        const movie=await Movie.find({
            ...(req.query.postId&&{_id:req.query.postId}),
            ...(req.query.searchTerm&&{
                $or:[
                    {name:{$regex:req.query.searchTerm,$options:'i'}},   
                ]
            }),
            ...(req.query.genre&&{
                $or:[
                    {genre:{$regex:req.query.genre,$options:'i'}}
                ]
               
            }),
            ...(req.query.ln&&{
                $or:[
                    {language:{$regex:req.query.ln,$options:'i'}}
                ]
               
            })
        }).sort({updatedAt:sortDirection})
        .skip(startIndex)
        .limit(limit)
        const totalLanguage =await Movie.find(
            req.query.ln && {
                $or: [
                    { language: { $regex: req.query.ln, $options: 'i' } }
                ]
            }
        );
        const totalGenre =await Movie.find(
            req.query.genre && {
                $or: [
                    { genre: { $regex: req.query.genre, $options: 'i' } }
                ]
            }
        );
      

        const totalMovies=await Movie.countDocuments();
        const filterTotalMovies=await movie.length;
        res.status(200).json({
            movie,
            totalMovies,
            filterTotalMovies,
            totalLanguage:totalLanguage.length,
            totalGenre:totalGenre.length
           
            
        })
    } catch (error) {
        res.status(500).json({sucess:false,message:error.message})
    }
}
async function deleteMovie(req, res) {
    try {

     
        if (!req.params.postId) {
            return res.status(400).json({ success: false, message: "postId parameter is missing" });
        }
        
       
        
        await Movie.findByIdAndDelete(req.params.postId);
        res.status(200).json("The post has been deleted successfully");
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}
async function updateMovie(req,res){
const {postId}=req.params;

try {
    const updatedMoive=await Movie.findByIdAndUpdate(postId,{
        $set:{
            name:req.body.name,
            language:req.body.language,
            movie_url:req.body.movie_url,
            release_date:req.body.release_date,
            thumbnail:req.body.thumbnail,
            rating:req.body.rating
        },
    },{new:true});

    res.status(200).json(updatedMoive)
} catch (error) {
    res.status(400).json({sucess:false,message:error.message})
}
}
module.exports={createMovie,getMovie,deleteMovie,updateMovie}