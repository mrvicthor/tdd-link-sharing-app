import { registerSchema } from "../../../../../client/src/lib/utils";
class Auth {
  checkIsInputEmpty(input: HTMLInputElement): boolean {
    return input.value === "";
  }

  handleRegister(event: Event) {
    event.preventDefault();
    const email = document.querySelector("#email") as HTMLInputElement;
    const password = document.querySelector("#password") as HTMLInputElement;
    const confirmPassword = document.querySelector(
      "#confirm-password"
    ) as HTMLInputElement;
    console.log(email.value, "email");
  }
}

export default Auth;

(() => {
  const registerForm = document.querySelector(
    ".register-form"
  ) as HTMLFormElement;

  registerForm.addEventListener("submit", new Auth().handleRegister);
})();
