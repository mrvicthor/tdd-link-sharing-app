"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserController_1 = require("../controllers/UserController");
const middlewares_1 = require("../middlewares");
exports.default = (router) => {
    router.get("/users", middlewares_1.isAuthenticated, UserController_1.UserController.getAllUsers);
};
//# sourceMappingURL=user.js.map