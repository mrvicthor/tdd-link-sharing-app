import { Request, Response, NextFunction } from "express";
import { UserModel } from "../db/models/users";
import { merge } from "lodash";

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const sessionToken = req.cookies["VICTOR-AUTH"];
    if (!sessionToken) {
      return res.sendStatus(403);
    }
    const existingUser = await UserModel.findOne({
      "authentication.sessionToken": sessionToken,
    });

    if (!existingUser) {
      return res.sendStatus(403);
    }
    merge(req, { identity: existingUser });
    return next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
