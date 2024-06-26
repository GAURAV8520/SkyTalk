import express from 'express';
import authRoutes from './routes/auth.routes.js';
import dotenv from 'dotenv';
import connectMongoDB from './db/connectMongodb.js'


dotenv.config();
const app = express();
const PORT=process.env.PORT||8000;
 
app.use("/api/auth",authRoutes)

app.listen(PORT,()=>{
    console.log(`server is running at port ${PORT}`);
    connectMongoDB();
});