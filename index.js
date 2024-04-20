require('dotenv').config()
const express=require('express')
const cors=require('cors')
const cookieParser = require('cookie-parser')
const { default: mongoose } = require('mongoose');
const Movie=require('./models/movie.model')
const movieRouter=require('./routes/movie.router')
const userRouter=require('./routes/user.router')
mongoose.connect('mongodb+srv://yubrajkhatri977:ZvZDtiPvWSlHQdcD@cluster0.lugycjo.mongodb.net/movie-api')
  .then(() => {
    console.log(`Connected successfully to the database`);
  })
  .catch((error) => {
    console.error(`Error connecting to the database:`, error);
    process.exit(1); // Exit the process if database connection fails
  });
require('./models/movie.model')
require('./models/user.model')

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

    console.log(`Server is listinig in ${process.env.PORT}`)
  
})