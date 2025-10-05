import dotenv from 'dotenv';
import path from 'path';

dotenv.config({path: path.join(__dirname, '../../.env')});

export const env = {
    get PORT(){
        return process.env.PORT
    },
    get MONGO_URL(){
        return process.env.MONGO_URL
    },
    get FRONTEND_URL(){
        return process.env.FRONTEND_URL
    }
}