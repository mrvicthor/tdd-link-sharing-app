import { Request, Response } from "express";
import { UserModel } from "../db/models/users";
import { random, authentication } from "helpers";
export class authController {
  async register(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.sendStatus(400);
      }

      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        return res.sendStatus(400);
      }
      const salt = random();
      const user = new UserModel({
        email,
        authentication: {
          salt,
          password: authentication(salt, password),
        },
      });

      await user.save().then((user) => user.toObject());
      return res
        .status(200)
        .json({
          message: "User created successfully",
          data: user,
        })
        .end();
    } catch (error) {
      console.log(error);
      return res.sendStatus(400);
    }
  }
}
