import { Request, Response } from "express";
import { UserModel } from "../db/models/users";

export class UserController {
  async getAllUsers(req: Request, res: Response) {
    const users = await UserModel.find();
    res.status(200);
    return users;
  }

  async getUserBySessionToken(sessionToken: string) {
    return UserModel.findOne({
      "authentication.sessionToken": sessionToken,
    });
  }
}
