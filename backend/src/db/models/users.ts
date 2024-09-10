import { Schema, model } from "mongoose";

interface IUser {
  email: string;
  authentication: {
    password: string;
    salt: string;
    sessionToken: string;
  };
  isVerified: boolean;
  verificationToken: string | undefined;
}

const userSchema = new Schema<IUser>({
  email: { type: String, required: true },
  authentication: {
    password: { type: String, required: true, select: false },
    salt: { type: String, select: false },
    sessionToken: { type: String, select: false },
  },
  isVerified: { type: Boolean, default: false },
  verificationToken: { type: String, default: "" },
});

export const UserModel = model<IUser>("User", userSchema);
