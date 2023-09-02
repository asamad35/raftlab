import mongoose from "mongoose"
import { User } from "./userModel";


interface Post {
    description: string;
    photoUrl?: string
    likes: [User]
    comments: [User]
    reposts: [User]
    likesCount: number
    commentsCount: number
    repostCount: number
    belongsTo: User
    tagUsers: [User]
}

type PostModel = mongoose.Model<Post, {}>;

const postSchema = new mongoose.Schema<Post, PostModel>({
    description: {
        type: String,
    },
    photoUrl: {
        type: String,
        default: "https://static.thenounproject.com/png/3465604-200.png",
    },
    likesCount: {
        type: Number,
        default: 0,
    },
    commentsCount: {
        type: Number,
        default: 0,
    },
    repostCount: {
        type: Number,
        default: 0,
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }],
    comments: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        commentText: {
            type: String,
            required: true,
        }
    }],
    reposts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }],
    tagUsers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }],
    belongsTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }

}, { timestamps: true });





export default mongoose.model("Post", postSchema);
