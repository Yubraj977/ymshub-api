require('dotenv').config()
const user = require('../models/user.model.js')
const bcrypt = require('bcrypt');
const errorHandler=require('../utils/error.js')
var jwt = require('jsonwebtoken');

const signup = async (req, res,next) => {
console.log(req.body)

    const { username, email, password } = req.body
    if (!username || !email || !password || username == ' ' || email == " " || password == '') {
       next(errorHandler(400,'All Fields are required'))
        
    }


    try {
        const hashpassword = await bcrypt.hash(password, 10,)
        const newuser = new user({ username, email, password:hashpassword })
        await newuser.save();
        res.json({ sucess:true, message: "Signup Sucess" })
    } catch (error) {

       next(error)
    }


}




const signin=async(req,res,next)=>{
   
console.log(req.body);
const {email, password } = req.body;
console.log(email)
console.log(password)
if ( !email || !password ||  email == " " || password == '') {
    next(errorHandler(400,'All Fields are required')) 
 }
  try {
    const validUser=await user.findOne({email})
   console.log(validUser)
    if(!validUser){
       return next(errorHandler(404,'user Not found'))
    }
    const validPassword=bcrypt.compareSync(password,validUser.password)
    
    if(!validPassword){
        next(errorHandler(400,"Invalid Password"))
    }



    if(validUser&&validPassword){
const token=jwt.sign({id:validUser._id,username:validUser.username,isAdmin:validUser.isAdmin},process.env.SECRET_KEY)
const userData={username:validUser.username, email:validUser.email,photo:validUser.photo,_id:validUser._id,isAdmin:validUser.isAdmin}

res.status(200).cookie("access_token",token,).json({sucess:true,...userData})
    }




  } catch (error) {
    next(error)
  }

}
const signOut=async(req,res,next)=>{
res.clearCookie('access_token').status(200).json('user signout sucess')
}




module.exports = { signup,signin,signOut};
