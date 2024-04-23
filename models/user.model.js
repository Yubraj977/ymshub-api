const mongoose=require('mongoose')
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,

    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    photo:{
        type:String,
        default:'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    password:{
        type:String,
        required:true
    }
    ,isAdmin:{
        type:Boolean,
        default:false
    },
    canDelete:{
      type:Boolean,
      deafult:false  
    }
},{timestamps:true});
const user=mongoose.model('user',userSchema)
module.exports=user;