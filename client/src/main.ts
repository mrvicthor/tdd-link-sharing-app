import "./style.css";
import typescriptLogo from "./typescript.svg";
import viteLogo from "/vite.svg";
import Auth from "./auth";
import { registerSchema } from "./helpers/schema";

import { router } from "./router";

document.addEventListener("DOMContentLoaded", () => {
  router();
});
