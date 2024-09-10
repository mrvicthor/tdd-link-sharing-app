"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const users_1 = require("../db/models/users");
const lodash_1 = require("lodash");
const isAuthenticated = async (req, res, next) => {
    try {
        const sessionToken = req.cookies["VICTOR-AUTH"];
        if (!sessionToken) {
            return res.sendStatus(403);
        }
        const existingUser = await users_1.UserModel.findOne({
            "authentication.sessionToken": sessionToken,
        });
        if (!existingUser) {
            return res.sendStatus(403);
        }
        (0, lodash_1.merge)(req, { identity: existingUser });
        return next();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
exports.isAuthenticated = isAuthenticated;
//# sourceMappingURL=index.js.map