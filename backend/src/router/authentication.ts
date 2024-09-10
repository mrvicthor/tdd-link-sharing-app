import { Router } from "express";
import { authController } from "../controllers/authentication";

export default (router: Router) => {
  router.post("/auth/register", authController.register);
  router.post("/auth/login", authController.login);
  router.post("/verify/:token", authController.verifyEmail);
};
