import { Request, Response } from "express";
import { UserModel } from "../db/models/users";
import {
  random,
  authentication,
  verificationToken,
  transporter,
} from "../helpers";
export class authController {
  async register(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      console.log(req.body, "body");
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
        isVerified: false,
        verificationToken,
      });

      await user.save().then((user) => user.toObject());

      const verificationLink = `http://localhost:8080/verify/${verificationToken}`;

      const mailOptions = {
        from: "victoreleanya89@gmail.com",
        to: email,
        subject: "Verify your email",
        html: `Please click this link to verify your email: <a href="${verificationLink}">${verificationLink}</a>`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("Error sending email: ", error);
        } else {
          console.log("Verification email sent: ", info.response);
        }
      });
      return res
        .status(200)
        .json({
          message: "User created successfully",
          data: user.toObject(),
        })
        .end();
    } catch (error) {
      console.log(error);
      return res.sendStatus(400);
    }
  }

  async verifyEmail(req: Request, res: Response) {
    console.log(req.params, "params");
    try {
      const { token } = req.params;
      const user = await UserModel.findOne({ verificationToken: token });
      if (!user) {
        return res.status(400).json({ message: "Invalid token" });
      }
      user.isVerified = true;
      user.verificationToken = undefined;
      await user.save();
      // if (req.method === "GET") {
      //   return res.redirect(
      //     `http://127.0.0.1:5173/?verified=true&token=${token}`
      //   );
      // }
      return res.status(200).json({ message: "Email verified successfully" });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async login(req: Request, res: Response) {
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
