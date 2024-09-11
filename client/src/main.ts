import "./style.css";
import typescriptLogo from "./typescript.svg";
import viteLogo from "/vite.svg";
import Auth from "./auth";
import { registerSchema } from "./helpers/schema";

let userIsVerified: boolean | undefined = undefined;
const url = "http://127.0.0.1:5173/";
let innerHTML = "";

if (userIsVerified === true) {
  innerHTML = `<p>Welcome ${userIsVerified}</p>`;
} else if (userIsVerified === false) {
  innerHTML = `<p>Logout ${userIsVerified}</p>`;
} else {
  innerHTML = `<section class="login-margin">
        <section class="login-wrapper">
          <div class="text-centre devlinks-logo">
            <img
              src="/assets/images/logo-devlinks-large.svg"
              alt="devlinks logo"
            />
          </div>
          <form class="bg-white login-form register-form">
            <h1 class="text-xl capitalise">create account</h1>
            <p class="mt-1 text-dark-gray text-sm capitalise">
              let's get you started sharing your links!
            </p>
            <div class="mt-2">
              <label for="email" class="font-light text-sm"
                >Email address</label
              >
              <div class="input-wrapper register-form-input flex">
                <img
                  src="/assets/images/icon-email.svg"
                  alt="email icon"
                />
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="e.g. alex@email.com "
                />
                <p class='error-message text-xs hide'>Can't be empty</p>
              </div>
            </div>
            <div class="mt-1">
              <label class="capitalise font-light text-sm" for="password"
                >create password</label
              >
              <div class="input-wrapper register-form-input flex">
                <img
                  src="/assets/images/icon-password.svg"
                  alt="password icon"
                />
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="At least 8 characters"
                />
              </div>
            </div>
            <div class="mt-1">
              <label class="capitalise font-light text-sm" for="password"
                >confirm password</label
              >
              <div class="input-wrapper register-form-input flex">
                <img
                  src="/assets/images/icon-password.svg"
                  alt="password icon"
                />
                <input
                  type="password"
                  name="confirm-password"
                  id="confirm-password"
                  placeholder="At least 8 characters"
                />
              </div>
            </div>
            <p class="mt-1 text-dark-gray capitalise text-sm">
              password must contain at least 8 characters
            </p>
            <button
              class="mt-1 btn btn-primary btn-large capitalise font-bold"
              type="submit"
            >
              create new account
            </button>
            <p class="mt-1 text-dark-gray text-centre text-sm">
              Already have an account?
              <a
                href="/login.html"
                target="_self"
                class="text-primary login-link"
                >Login</a
              >
            </p>
          </form>
        </section>
      </section>`;
}

document.querySelector<HTMLDivElement>("#app")!.innerHTML = innerHTML;
// document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
//   <div>
//     <a href="https://vitejs.dev" target="_blank">
//       <img src="${viteLogo}" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://www.typescriptlang.org/" target="_blank">
//       <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
//     </a>
//     <h1>Vite + TypeScript</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite and TypeScript logos to learn more
//     </p>
//   </div>
// `;

const registerform = document.querySelector(
  ".register-form"
) as HTMLFormElement;

const email = document.querySelector<HTMLInputElement>("#email")!;
const password = document.querySelector<HTMLInputElement>("#password")!;
const confirmPassword =
  document.querySelector<HTMLInputElement>("#confirm-password")!;

registerform.addEventListener("submit", (e) => {
  e.preventDefault();
  let auth = new Auth(
    email.value.trim(),
    password.value.trim(),
    confirmPassword.value.trim()
  );
  const result = registerSchema.safeParse(auth);
  const errors = result.success ? {} : result.error.format();

  if (
    errors &&
    email &&
    email?.parentElement?.classList.contains("input-wrapper")
  ) {
    email?.parentElement?.classList.remove("input-wrapper");
    email?.parentElement?.classList.add("error-wrapper");
    email?.parentElement?.parentElement
      ?.querySelector('label[for="email"]')
      ?.classList.add("error-message");
    email?.parentElement?.parentElement
      ?.querySelector("p.error-message")
      ?.classList.remove("hide");
    email?.parentElement?.querySelector<HTMLInputElement>("input")?.focus();
  }
});
