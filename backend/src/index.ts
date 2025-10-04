import express from 'express';
import validateEnv from './utils/env';
import { env } from './config/env.config';
import { connectDB } from './config/db.config';
import cors from 'cors';
import corsOption from './config/cors.config';

validateEnv()
connectDB()

const app = express();

app.use(cors(corsOption))


const port = env.PORT
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
    
})