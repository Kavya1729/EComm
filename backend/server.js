import express from 'express';
import dotenv from 'dotenv';
import { blue,bold } from "colorette";
import connectdb from './database/db.js';
import userRoutes from '../backend/routes/userRoutes.js';
import cors from 'cors';

dotenv.config();


const app = express();
const PORT = process.env.PORT || 8081

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use(express.json());

app.use('/api/v1/user', userRoutes)

app.listen(PORT, ()=>{
    connectdb()
    console.log(bold(blue(`Server is running on port ${PORT}`)));
})