import bigPromise from "./bigPromise";
import UserSchema from "../models/userModel";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express"

interface JwtPayload {
  id: string
}

export const isLoggedIn = bigPromise(async (req: Request, res: Response, next: NextFunction) => {
  const token =
    req.body.token ||
    (req?.header("Authorization") &&
      req.header("Authorization")?.replace("Bearer ", ""));

  if (!token) {
    throw new Error("Please login first to continue");
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload
  req.user = await UserSchema.findById(decoded?.id).select("-password");
  next();
});
