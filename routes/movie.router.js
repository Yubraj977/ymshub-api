const express=require('express')
const {createMovie,getMovie,deleteMovie,updateMovie}=require('../controllers/movie.controller')
const router=express.Router()
router.get('/find',getMovie)
router.post('/create',createMovie)
router.delete('/delete/:postId',deleteMovie)
router.put('/update/:postId',updateMovie)
module.exports=router