import { Router } from "express";
import { authController } from "../controllers/authentication";
let auth = new authController();
export default (router: Router) => {
  router.post("/auth/register", auth.register);
  router.post("/auth/login", auth.login);
  // router.post("/verify/:token", auth.verifyEmail);
  router.get("/verify/:token", auth.verifyEmail);
};
