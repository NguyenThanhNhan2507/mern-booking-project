import express from 'express';
import cors from 'cors'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser';
import 'dotenv/config'
import userRoutes from './routes/userRoute'
import authRoutes from './routes/authRoute'


const app = express();
const POST = 7000



if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({
      path: ".env",
    });
  }


mongoose.connect( process.env.URL_DB as string ,{
}).then((data) =>{
    console.log(`mongodb is connected with server: ${data.connection.host}`);
})

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);




app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)




app.listen(POST, ()=>{
    console.log(`server running on localhost: ${POST}`)
})

