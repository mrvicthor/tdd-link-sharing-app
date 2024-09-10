"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const users_1 = require("../db/models/users");
class UserController {
    static async getAllUsers(req, res) {
        try {
            const users = await users_1.UserModel.find();
            return res.status(200).json(users);
        }
        catch (error) {
            console.log(error);
            return res.sendStatus(400);
        }
    }
    async getUserBySessionToken(sessionToken) {
        return users_1.UserModel.findOne({
            "authentication.sessionToken": sessionToken,
        });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=UserController.js.map