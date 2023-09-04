import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import validator from "validator"


export interface User {
  name: string;
  email: string;
  password?: string;
  originalPassword?: string
  status: string
  photoUrl?: string
  followers: [User] // other user who follows the LoggedUser
  followings: [User]  // whom the loggedUser follows
}

interface UserMethods {
  isPasswordValid(userEnteredPassword: string): Promise<boolean>;
  getJwtToken(): string
}

// Create a new Model type that knows about UserMethods...
type UserModel = mongoose.Model<User, {}, UserMethods>;

const userSchema = new mongoose.Schema<User, UserModel, UserMethods>({
  name: {
    type: String,
    required: [true, "Name is a required field"],
    maxlength: [20, "LaName should be less than 20 characters"],
  },
  email: {
    type: String,
    required: [true, "Email is a required field"],
    unique: true,
    validate: {
      validator: function (email: string) {
        return validator.isEmail(email);
      },
      message: (props: any) => `${props.value} is not a valid phone number!`,
    },
  },
  password: {
    type: String,
    required: [true, "Password is a required field"],
    minlength: [6, "Password should be atleast 6 characters long"],
    select: false,
  },
  originalPassword: {
    type: String,
  },
  status: {
    type: String,
    default: "Hi, I am on social Bowl",
  },
  photoUrl: {
    type: String,
    default: "https://static.thenounproject.com/png/3465604-200.png",
  },

  followers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }],
  followings: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }],



}, { timestamps: true });

// hash pass before save
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password!, 10)
});

// capialize first and last name before saving to db
userSchema.pre("save", async function (next) {
  if (!this.isModified("firstName") && !this.isModified("lastName")) {
    return next();
  }
  this.name =
    this.name.slice(0, 1).toUpperCase() + this.name.slice(1);
});

// comapre user pass with hashed password
userSchema.methods.isPasswordValid = async function (userEnteredPassword: string) {
  return await bcrypt.compare(userEnteredPassword, this.password);
};

userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRY,
  });
};

export default mongoose.model("User", userSchema);
