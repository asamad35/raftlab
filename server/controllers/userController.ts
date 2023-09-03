import { Request, Response, NextFunction } from "express"
import bigPromise from "../middlewares/bigPromise"
import UserModel from "../models/userModel";
import PostModel from "../models/postModel";
import { v2 as cloudinary } from "cloudinary";
import { UploadedFile } from "express-fileupload";

export const signup = bigPromise(async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    console.log(req.body)

    let user = await UserModel.create({
        name,
        email,
        password,
        originalPassword: password,
    })

    // token
    const token = user.getJwtToken();

    user = user.toObject();
    delete user.originalPassword;
    delete user.password;

    res.status(200).json({
        data: user,
        token,
        message: "Registration successful",
    });
});

export const login = bigPromise(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    // sleep func
    // await new Promise((res) => setTimeout(() => res(6), 3000))

    let user = await UserModel.findOne({ email }).select("+password");

    // check if user exist
    if (!user) throw new Error("email is not registered");

    const isPasswordValid = await user.isPasswordValid(password);

    if (!isPasswordValid) throw Error("Password does not match.");

    // token
    const token = user.getJwtToken();

    // remove password fields
    user = user.toObject();
    delete user.originalPassword;
    delete user.password;

    res.status(200).json({
        data: user,
        token,
        message: "Login successful",
    });
});

export const getUserDetails = bigPromise(async (req: Request, res: Response) => {
    const { email } = req.body;
    let user = await UserModel.findOne({ email }).populate("followers").populate("followings")

    res.status(200).json({
        data: user,
        message: "user data",
    });
});

export const createPost = bigPromise(async (req: Request, res: Response) => {
    let { description, postPhotoUrl, tagUsersIds } = req.body;

    let uploadedFileObject = null

    if (req.files) {
        const postPhoto = req.files.postPhoto as UploadedFile

        console.log(postPhoto)
        uploadedFileObject = await cloudinary.uploader.upload(
            postPhoto.tempFilePath,
            {
                folder: "raftlab",
            }
        );
    }

    console.log(uploadedFileObject?.secure_url)

    const post = await PostModel.create({ description, photoUrl: uploadedFileObject?.secure_url ?? postPhotoUrl, belongsTo: req?.user?.id, tagUsers: tagUsersIds })

    let populatedPost = await PostModel.findById(post._id).populate({
        path: 'comments',
        populate: { path: 'user' }
    }).populate('likes').populate('reposts').populate('belongsTo')

    res.status(200).json({
        data: populatedPost,
        message: "updated post list",
    });
});

export const updatePost = bigPromise(async (req: Request, res: Response) => {
    const { actionType, comment, userId, postId } = req.body;

    let updateQuery = {}
    let post = await PostModel.findById({ _id: postId })

    switch (actionType) {
        case 'like': {
            if (post?.likes.includes(userId)) {
                updateQuery = { $inc: { likesCount: -1 }, $pull: { likes: userId } }
            } else {
                updateQuery = { $inc: { likesCount: 1 }, $push: { likes: userId } }
            }
            break
        }

        case 'comment': {
            updateQuery = { $inc: { commentsCount: 1 }, $push: { comments: { $each: [{ user: userId, commentText: comment }], $position: 0 } } }
            break
        }
        case 'repost': {
            updateQuery = { $inc: { repostCount: 1 }, $push: { reposts: userId } }
            break
        }
    }

    const updatedPost = await PostModel.findByIdAndUpdate({ _id: postId }, updateQuery, { returnDocument: "after" }).populate({
        path: 'comments',
        populate: { path: 'user' }
    }).populate('likes').populate('reposts').populate('belongsTo')

    res.status(200).json({
        data: updatedPost,
        message: "updated post",
    });
});

export const getUserPosts = bigPromise(async (req: Request, res: Response) => {
    let posts = await PostModel.find({ belongsTo: req?.user?.id }).populate({
        path: 'comments',
        populate: { path: 'user' }
    }).populate('likes').populate('reposts').populate('belongsTo')

    res.status(200).json({
        data: posts,
        message: "all posts",
    });
});

export const getuserFeed = bigPromise(async (req: Request, res: Response) => {
    let userFeedPosts = await PostModel.find({
        $or: [
            { belongsTo: req?.user?.id },
            {
                belongsTo: { $in: req?.user?.followings.map(id => id) }
            }
        ]
    }).populate({
        path: 'comments',
        populate: { path: 'user' }
    }).populate('likes').populate('reposts').populate('belongsTo').sort({ createdAt: 'desc' })


    res.status(200).json({
        data: userFeedPosts,
        message: "user feed posts",
    });
});

export const followAndUnfollow = bigPromise(async (req: Request, res: Response) => {
    const { otherUserId } = req.body
    let loggedUser = await UserModel.findById({ _id: req.user?.id })

    let loggedUserUpdateQuery = {}
    let otherUserUpdateQuery = {}

    if (loggedUser?.followings.includes(otherUserId)) {
        loggedUserUpdateQuery = { $pull: { followings: otherUserId } }
        otherUserUpdateQuery = { $pull: { followers: loggedUser._id } }
    } else {
        loggedUserUpdateQuery = { $push: { followings: otherUserId } }
        otherUserUpdateQuery = { $push: { followers: loggedUser?._id } }

    }
    const updatedLoggedUser = await UserModel.findByIdAndUpdate({ _id: req.user?.id }, loggedUserUpdateQuery, { returnDocument: "after" })
    const updatedOtherUser = await UserModel.findByIdAndUpdate({ _id: otherUserId }, otherUserUpdateQuery, { returnDocument: "after" })

    res.status(200).json({
        data: updatedLoggedUser,
        message: "user followings updated",
    });
});

export const getNotFollowingUsers = bigPromise(async (req: Request, res: Response) => {
    const loggedUser = await UserModel.findById(req.user?.id)
    const followings = JSON.parse(JSON.stringify(loggedUser?.followings))

    console.log(followings)

    let getNotFollowingUsers = await UserModel.find({ _id: { $nin: [req.user?.id, ...followings] } })
    res.status(200).json({
        data: getNotFollowingUsers,
        message: "list of users",
    });
});

