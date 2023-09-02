require("dotenv").config();
import app from "./app"
import connectWithDb from "./config";
import { User } from "./models/userModel";
// const cloudinary = require("cloudinary");

const port = process.env.port;

// connect with database
connectWithDb();

declare global {
    namespace Express {
        interface Request {
            user: {
                name: string;
                email: string;
                password?: string;
                originalPassword?: string
                status: string
                photoUrl?: string
                followers: [User]
                followings: [User]
                id?: string
            } | null
        }
    }
}


// cloudinary config
// cloudinary.config({ 
//     cloud_name: process.env.CLOUDINARY_NAME,
//     api_key: process.env.CLOUDINARY_KEY,
//     api_secret: process.env.CLOUDINARY_SECRET,
// });

app.listen(3001, () => {
    console.log(`server is running at port 3001`);
});
export { };