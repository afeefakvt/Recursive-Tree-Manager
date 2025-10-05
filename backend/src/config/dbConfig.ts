import mongoose from 'mongoose';
import { env } from './envConfig';

export const connectDB = async ()=>{
    try {
        await mongoose.connect(env.MONGO_URL as string)
        console.log("MongoDB connected");
        
    } catch (error) {
        console.log(error);
        process.exit(1)
        
    }
}