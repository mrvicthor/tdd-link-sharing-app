import { Request, Response } from "express";
import { UserModel } from "../db/models/users";

export class UserController {
  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await UserModel.find();
      return res.status(200).json(users);
    } catch (error) {
      console.log(error);
      return res.sendStatus(400);
    }
  }

  async getUserBySessionToken(sessionToken: string) {
    return UserModel.findOne({
      "authentication.sessionToken": sessionToken,
    });
  }

  async getUser(req: Request, res: Response) {
    try {
      const sessionToken = req.cookies["VICTOR-AUTH"];
      if (!sessionToken) {
        return res.sendStatus(403);
      }

      const user = await UserModel.findOne({
        "authentication.sessionToken": sessionToken,
      });
      if (!user) {
        return res.sendStatus(403);
      }
      const userWithoutSensitiveData = {
        _id: user._id,
        email: user.email,
        isVerified: user.isVerified,
      };
      return res.status(200).json(userWithoutSensitiveData);
    } catch (error) {
      console.error(error);
      return res.sendStatus(400);
    }
  }
}
