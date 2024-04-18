const express=require('express');
const router=express.Router();
const {signup,signin,signOut}=require('../controllers/user.controller')
router.post('/signup',signup)
router.post('/signin',signin)
router.post('/signout',signOut)

module.exports=router