"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    email: { type: String, required: true },
    authentication: {
        password: { type: String, required: true, select: false },
        salt: { type: String, select: false },
        sessionToken: { type: String, select: false },
    },
    isVerified: { type: Boolean, default: false },
    verificationToken: { type: String, default: "" },
});
exports.UserModel = (0, mongoose_1.model)("User", userSchema);
//# sourceMappingURL=users.js.map