import express, { Request, Response } from 'express';
import cors from 'cors'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser';
import 'dotenv/config'
import userRoutes from './routes/userRoute'
import authRoutes from './routes/authRoute'
import myHotelRoutes from "./routes/myHotelRoute";
import path from 'path';
import { v2 as cloudinary } from "cloudinary";


const app = express();
const POST = 3000




cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});



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


app.use(express.static(path.join(__dirname, "../../frontend/dist")));

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use("/api/my-hotels", myHotelRoutes);


app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
});

app.listen(POST, ()=>{
    console.log(`server running on localhost: ${POST}`)
})

