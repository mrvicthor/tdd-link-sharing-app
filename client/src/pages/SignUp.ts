import Auth, { registerSchema } from "../auth";
export default function SignUp(): string {
  return `
  <section class="login-margin">
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
                 <p class='error-message text-xs flex-item-3' id="emailError"></p>
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
                  <p class='error-message text-xs flex-item-3' id="passwordError"></p>
               </div>
             </div>
             <div class="mt-1">
               <label class="capitalise font-light text-sm" for="confirm-password"
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
                  <p class='error-message text-xs flex-item-3' id="confirmPasswordError"></p>
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
      </section>
`;
}

export function initSignUp() {
  const registerform =
    document.querySelector<HTMLFormElement>(".register-form")!;
  const email = document.querySelector<HTMLInputElement>("#email")!;
  const password = document.querySelector<HTMLInputElement>("#password")!;
  const confirmPassword =
    document.querySelector<HTMLInputElement>("#confirm-password")!;
  const inputs = [email, password, confirmPassword];
  const serverUrl = "http://localhost:8080";
  registerform.addEventListener("submit", (e) => {
    e.preventDefault();
    let auth = new Auth(
      email.value.trim(),
      password.value.trim(),
      confirmPassword.value.trim()
    );
    const result = registerSchema.safeParse(auth);
    function displayError(
      input: HTMLInputElement,
      message: string,
      id: string
    ) {
      const parent = input.parentElement as HTMLElement;
      const errorElement = document.getElementById(`${id}`) as HTMLElement;
      if (errorElement) errorElement.innerHTML = message;
      auth.clearError(parent, message);
    }
    if (!result.success) {
      const formattedErrors = result.error.format();
      displayError(
        email,
        formattedErrors.email?._errors.join(", ") || "",
        "emailError"
      );
      displayError(
        password,
        formattedErrors.password?._errors.join(", ") || "",
        "passwordError"
      );
      displayError(
        confirmPassword,
        formattedErrors.confirmPassword?._errors.join(", ") || "",
        "confirmPasswordError"
      );
      if (
        inputs.some((input) =>
          input.parentElement?.classList.contains("error-wrapper")
        )
      ) {
        inputs.forEach((input) => {
          console.log("changing");
          input.removeEventListener("input", auth.handleInputChange);
          input.addEventListener("input", auth.handleInputChange);
        });
      }
      return;
    }
    const dataToSend = {
      email: auth.email,
      password: auth.password,
    };
    fetch(`${serverUrl}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    })
      .then((data) => {
        console.log("Success:", data);
        window.location.href = "/login";
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  });
}
