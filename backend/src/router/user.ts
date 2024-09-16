import { UserController } from "../controllers/UserController";
import { Router } from "express";
import { isAuthenticated } from "../middlewares";
let user = new UserController();
export default (router: Router) => {
  router.get("/user", isAuthenticated, user.getUser);
  router.get("/users", isAuthenticated, user.getAllUsers);
};
