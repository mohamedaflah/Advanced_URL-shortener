import mongoose, { Document, Schema, Model } from "mongoose";

// Define a TypeScript interface for the User document
export interface IUser extends Document {
  email: string;
  username?: string;
  password?: string;
  profileUrl?: string;
  googleId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define the Mongoose schema
const UserSchema: Schema<IUser> = new mongoose.Schema<IUser>(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    username: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: false,
    },
    profileUrl: {
      type: String,
      required: false,
    },
    googleId: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

// Export the model
const UserModel: Model<IUser> = mongoose.model<IUser>(
  "urlshortner-user",
  UserSchema
);
export default UserModel;
