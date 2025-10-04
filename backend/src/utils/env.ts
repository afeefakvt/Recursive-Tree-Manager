import { env } from "../config/env.config";

export default function validateEnv(){
    if(!env.PORT){
        throw new Error('PORT is not defined in env')
    }
    if(!env.MONGO_URL){
        throw new Error("MONGODB URL not defined in env")
    }
    if(!env.FRONTEND_URL){
        throw new Error("FRONTEND URL is not defined in env")
    }
}