"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transporter = exports.authentication = exports.verificationToken = exports.random = void 0;
const crypto_1 = __importDefault(require("crypto"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const SECRET = "VICTOR-REST-API";
const random = () => crypto_1.default.randomBytes(128).toString("base64");
exports.random = random;
exports.verificationToken = crypto_1.default.randomBytes(20).toString("hex");
const authentication = (salt, password) => {
    return crypto_1.default
        .createHmac("sha256", [salt, password].join("/"))
        .update(SECRET)
        .digest("hex");
};
exports.authentication = authentication;
exports.transporter = nodemailer_1.default.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.GMAIL_ACCT,
        pass: process.env.GMAIL_PASS,
    },
});
//# sourceMappingURL=index.js.map