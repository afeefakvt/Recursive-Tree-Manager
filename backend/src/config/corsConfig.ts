import { CorsOptions } from "cors";
import { env } from "./envConfig";

const corsOption : CorsOptions = {
    origin: env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE", "PATcH"],
    allowedHeaders: ["Content-type","Authorization"],
    credentials:true
}

export default corsOption