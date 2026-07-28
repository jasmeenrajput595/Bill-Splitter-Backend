import express from 'express';
import connectDB from './config/db.js';
import cors from 'cors';
import 'dotenv/config';

const app = express();
app.use(cors());
app.use(express.json())

app.get("/" , (req , res)=>{
    res.send("hello")
});
connectDB();

app.listen(3000 , ()=>{
    console.log("Server is running on port 3000")
})