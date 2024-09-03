import { Request, Response } from "express";
import { UserModel } from "../db/models/users";
import { random, authentication } from "../helpers";
export class authController {
  static async register(req: Request, res: Response) {
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

  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.sendStatus(400);
      }
      const user = await UserModel.findOne({ email }).select(
        "+authentication.salt +authentication.password"
      );
      if (!user) {
        return res.sendStatus(400);
      }
      const expectedHash = authentication(user.authentication.salt, password);
      if (user.authentication.password !== expectedHash) {
        return res.sendStatus(403);
      }
      const salt = random();
      user.authentication.sessionToken = authentication(
        salt,
        user._id.toString()
      );
      await user.save();
      res.cookie("VICTOR-AUTH", user.authentication.sessionToken, {
        domain: "localhost",
        path: "/",
      });
      return res
        .status(200)
        .json({
          message: "User logged in successfully",
          data: user,
        })
        .end();
    } catch (error) {
      console.log(error);
      return res.sendStatus(400);
    }
  }
}
