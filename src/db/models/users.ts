import { Schema, model } from "mongoose";

interface IUser {
  email: string;
  authentication: {
    password: string;
    salt: string;
    sessionToken: string;
  };
}

const userSchema = new Schema<IUser>({
  email: { type: String, required: true },
  authentication: {
    password: { type: String, required: true, select: false },
    salt: { type: String, select: false },
    sessionToken: { type: String, select: false },
  },
});

export const UserModel = model<IUser>("User", userSchema);
