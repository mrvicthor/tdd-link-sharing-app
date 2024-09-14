import { Request, Response } from "express";
import { UserModel } from "../db/models/users";

export class UserController {
  static async getAllUsers(req: Request, res: Response) {
    try {
      const users = await UserModel.find();
      return res.status(200).json(users);
    } catch (error) {
      console.log(error);
      return res.sendStatus(400);
    }
  }

  static async getUserBySessionToken(sessionToken: string) {
    return UserModel.findOne({
      "authentication.sessionToken": sessionToken,
    });
  }
}
