import mongoose from "mongoose"
import { User } from "./userModel";


interface Post {
    description: string;
    photoUrl?: string
    likes: [User]
    comments: [{ user: User, commentText: string, timeStamp: number }]
    reposts: [User]
    likesCount: number
    commentsCount: number
    repostCount: number
    belongsTo: User
    tagUserIds: [User]
}

type PostModel = mongoose.Model<Post, {}>;

const postSchema = new mongoose.Schema<Post, PostModel>({
    description: {
        type: String,
    },
    photoUrl: {
        type: String,
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
        },
        timeStamp: {
            type: Number,
            default: Date.now,
        }
    }],
    reposts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }],
    tagUserIds: [{
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
