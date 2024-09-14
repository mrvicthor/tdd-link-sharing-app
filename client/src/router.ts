import SignUp, { initSignUp } from "./pages/SignUp";
import Login, { initLogin } from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import {
  isEmailVerified,
  isAuthenticated,
  getCurrentUser,
  fetchCurrentUser,
} from "./auth";
import EmailVerification, {
  initEmailVerification,
} from "./pages/EmailVerification";

export const router = async () => {
  const path = window.location.pathname;
  const app = document.querySelector<HTMLDivElement>("#app")!;

  if (!app) return;

  if (isAuthenticated() && !getCurrentUser()) {
    const token = localStorage.getItem("token");
    if (token) {
      await fetchCurrentUser(token);
    }
  }

  switch (path) {
    case "/signup":
      app.innerHTML = SignUp();
      initSignUp();
      break;
    case "/login":
      app.innerHTML = Login();
      initLogin();
      break;
    case "/dashboard":
      if (isAuthenticated()) {
        if (isEmailVerified()) {
          app.innerHTML = Dashboard();
        } else {
          window.location.href = "/verify-email";
        }
      } else {
        window.location.href = "/login";
      }
      break;
    case "/verify-email":
      app.innerHTML = EmailVerification();
      initEmailVerification();
      break;
    default:
      window.location.href = "/login";
  }

  app.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    if (target.tagName === "A") {
      e.preventDefault();
      const href = target.getAttribute("href");
      if (href) {
        history.pushState(null, "", href);
        router();
      }
    }
  });
};
