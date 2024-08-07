import express from 'express';
import authRoutes from './routes/auth.routes.js';
import dotenv from 'dotenv';
import connectMongoDB from './db/connectMongodb.js'
import cookieParser from 'cookie-parser';
import userRoutes  from './routes/user.routes.js'
import {v2 as cloudinary} from 'cloudinary'
import postRoutes from './routes/post.routes.js'
import noitificationRoutes from './routes/noitification.routes.js';


dotenv.config();

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
});

const app = express();
const PORT=process.env.PORT||8000;
 
app.use(express.json({limit:'5mb'}));  //to parse req.body
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use("/api/auth",authRoutes);
app.use("/api/users",userRoutes);

app.use("/api/posts",postRoutes);
app.use("/api/notifications",noitificationRoutes)

app.listen(PORT,()=>{
    console.log(`server is running at port ${PORT}`);
    connectMongoDB();
});