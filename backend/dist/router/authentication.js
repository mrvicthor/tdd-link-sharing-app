"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authentication_1 = require("../controllers/authentication");
exports.default = (router) => {
    router.post("/auth/register", authentication_1.authController.register);
    router.post("/auth/login", authentication_1.authController.login);
    router.post("/verify/:token", authentication_1.authController.verifyEmail);
};
//# sourceMappingURL=authentication.js.map