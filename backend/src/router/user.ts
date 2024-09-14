import { UserController } from "../controllers/UserController";
import { Router } from "express";
import { isAuthenticated } from "../middlewares";

export default (router: Router) => {
  router.get("/user", isAuthenticated, UserController.getUserBySessionToken);
};
