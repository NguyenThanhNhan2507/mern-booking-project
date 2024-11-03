import express from 'express';
import cors from 'cors'
import 'dotenv/config'
import mongoose from 'mongoose'
import userRoutes from './routes/userRoute'


const app = express();
const POST = 3000



if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({
      path: ".env",
    });
  }


mongoose.connect( process.env.URL_DB as string ,{
}).then((data) =>{
    console.log(`mongodb is connected with server: ${data.connection.host}`);
})


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());





app.use('/api/users', userRoutes)




app.listen(POST, ()=>{
    console.log(`server running on localhost: ${POST}`)
})

