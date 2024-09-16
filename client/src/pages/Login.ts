import { loginSchema, setCurrentUser } from "../auth";

export default function Login(): string {
  return `
  <section class="login-margin">
        <section class="login-wrapper">
          <div class="text-centre devlinks-logo">
            <img
              src="public/assets/images/logo-devlinks-large.svg"
              alt="devlinks logo"
            />
          </div>
          <form class="bg-white login-form">
            <h1 class="text-xl capitalise">login</h1>
            <p class="mt-1 text-dark-gray text-sm capitalise">
              add your details below to get back into the app
            </p>
            <div class="mt-2">
              <label for="email" class="font-light text-sm"
                >Email address</label
              >
              <div class="input-wrapper register-form-input flex">
                <img
                  src="public/assets/images/icon-email.svg"
                  alt="email icon"
                />
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="e.g. alex@email.com "
                />
              </div>
            </div>
            <div class="mt-1">
              <label class="capitalise font-light text-sm" for="password"
                >password</label
              >
              <div class="input-wrapper register-form-input flex">
                <img
                  src="public/assets/images/icon-password.svg"
                  alt="password icon"
                />
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter your password"
                />
              </div>
            </div>
            <button
              class="mt-1 btn btn-primary btn-large capitalise font-bold"
              type="submit"
            >
              login
            </button>
            <p class="mt-1 text-dark-gray text-centre text-sm">
              Don't have an account?
              <a
                href="/signup"
                target="_self"
                class="text-primary login-link"
                >Create Account</a
              >
            </p>
          </form>
        </section>
      </section>
  `;
}

export function initLogin() {
  const loginform = document.querySelector<HTMLFormElement>(".login-form")!;
  const email = document.querySelector<HTMLInputElement>("#email")!;

  const password = document.querySelector<HTMLInputElement>("#password")!;

  const serverUrl = "http://localhost:8080";
  loginform?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const dataToSend = {
      email: email.value.trim(),
      password: password.value.trim(),
    };

    const result = loginSchema.safeParse(dataToSend);
    console.log("logging in", result);
    try {
      const response = await fetch(`${serverUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to log in");
      }
      const result = await response.json();
      const { data } = result;

      const dataToShow = {
        _id: data._id,
        email: data.email,
        isVerified: data.isVerified,
      };

      setCurrentUser(dataToShow);
      if (data) {
        console.log("data", data);
        debugger;
        if (data.isVerified) {
          window.location.href = "/dashboard";
        } else {
          window.location.href = "/verify-email";
        }
      } else {
        throw new Error("Failed to fetch user");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Failed to log in");
    }
  });
}
