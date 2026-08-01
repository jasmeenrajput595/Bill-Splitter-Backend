import express from 'express';
import connectDB from './config/db.js';
import cors from 'cors';
import 'dotenv/config';
import router from './Routes/routes.js'

const app = express();
app.use(cors());
app.use(express.json())
app.use("/billSplitter", router)

app.get('/' ,(req,res)=>{
    res.send("server started")
})
connectDB();

app.listen(3000 , ()=>{
    console.log("Server is running on port 3000")
})