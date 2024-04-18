require('dotenv').config()
const express=require('express')
const cors=require('cors')
const cookieParser = require('cookie-parser')
const { default: mongoose } = require('mongoose');
const Movie=require('./models/movie.model')
const movieRouter=require('./routes/movie.router')
const userRouter=require('./routes/user.router')


const app = express()
app.use(cookieParser())
app.use(cors())
app.use(express.json())


// Routes to use
app.use('/api/movie',movieRouter)
app.use('/api/user',userRouter)

app.use((err,req,res,next)=>{
    const message=err.message || "Error in the Yubraj Server"
    const statusCode=err.statusCode|| 500
    res.status(statusCode).json({
      sucess:false,
      statusCode,
      message,

    })
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// app.get('/create', async (req, res) => {
//   try {
//       const myMovie = new Movie({
//           name: "insterteller"
//       });
//       await myMovie.save();
//       res.status(201).send("Movie created successfully!");
//   } catch (error) {
//       console.error("Error creating movie:", error);
//       res.status(500).send("Error creating movie");
//   }
// });


app.listen(process.env.PORT,()=>{
try {
  mongoose.connect(process.env.DATABASE_URI).then((res)=>{
    console.log('connection with database sucess')
  })
} catch (error) {
 console.log(`Error with the database`) 
}
    console.log(`Server is listinig in ${process.env.PORT}`)
  
})