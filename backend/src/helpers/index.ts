import crypto from "crypto";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const SECRET = "VICTOR-REST-API";

export const random = () => crypto.randomBytes(128).toString("base64");

export const verificationToken = crypto.randomBytes(20).toString("hex");
export const authentication = (salt: string, password: string) => {
  return crypto
    .createHmac("sha256", [salt, password].join("/"))
    .update(SECRET)
    .digest("hex");
};

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.GMAIL_ACCT,
    pass: process.env.GMAIL_PASS,
  },
});
