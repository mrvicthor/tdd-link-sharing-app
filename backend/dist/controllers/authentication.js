"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const users_1 = require("../db/models/users");
const helpers_1 = require("../helpers");
class authController {
    static async register(req, res) {
        try {
            const { email, password } = req.body;
            console.log(req.body, "body");
            if (!email || !password) {
                return res.sendStatus(400);
            }
            const existingUser = await users_1.UserModel.findOne({ email });
            if (existingUser) {
                return res.sendStatus(400);
            }
            const salt = (0, helpers_1.random)();
            const user = new users_1.UserModel({
                email,
                authentication: {
                    salt,
                    password: (0, helpers_1.authentication)(salt, password),
                },
                isVerified: false,
                verificationToken: helpers_1.verificationToken,
            });
            await user.save().then((user) => user.toObject());
            const verificationLink = `http://localhost:8080/verify/${helpers_1.verificationToken}`;
            const mailOptions = {
                from: "victoreleanya89@gmail.com",
                to: email,
                subject: "Verify your email",
                html: `Please click this link to verify your email: <a href="${verificationLink}">${verificationLink}</a>`,
            };
            helpers_1.transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log("Error sending email: ", error);
                }
                else {
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
        }
        catch (error) {
            console.log(error);
            return res.sendStatus(400);
        }
    }
    static async verifyEmail(req, res) {
        try {
            const { token } = req.params;
            const user = await users_1.UserModel.findOne({ verificationToken: token });
            if (!user) {
                return res.status(400).json({ message: "Invalid token" });
            }
            user.isVerified = true;
            user.verificationToken = undefined;
            await user.save();
            res.redirect(`http://localhost:8080/login.html?token=${token}`);
            return res.status(200).json({ message: "Email verified successfully" });
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    static async login(req, res) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.sendStatus(400);
            }
            const user = await users_1.UserModel.findOne({ email }).select("+authentication.salt +authentication.password");
            if (!user) {
                return res.sendStatus(400);
            }
            const expectedHash = (0, helpers_1.authentication)(user.authentication.salt, password);
            if (user.authentication.password !== expectedHash) {
                return res.sendStatus(403);
            }
            const salt = (0, helpers_1.random)();
            user.authentication.sessionToken = (0, helpers_1.authentication)(salt, user._id.toString());
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
        }
        catch (error) {
            console.log(error);
            return res.sendStatus(400);
        }
    }
}
exports.authController = authController;
//# sourceMappingURL=authentication.js.map