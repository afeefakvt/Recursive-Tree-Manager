import express from 'express';
import validateEnv from './utils/env';
import { env } from './config/envConfig';
import { connectDB } from './config/dbConfig';
import cors from 'cors';
import corsOption from './config/corsConfig';
import { errorHandler } from './middlewares/errorHandler';
import nodeRoutes from './routes/nodeRoutes';

validateEnv()
connectDB()

const app = express();

app.use(cors(corsOption))
app.use(express.json())
app.use(errorHandler)

app.use('/api',nodeRoutes);


const port = env.PORT
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
    
})