alert("Vicky!!!");
class Auth {
  checkIsInputEmpty(input: HTMLInputElement): boolean {
    return input.value === "";
  }

  handleRegister(event: Event) {}
}

export default Auth;

(() => {
  alert("Ta da!!!");
  const registerForm = document.querySelector(
    ".register-form"
  ) as HTMLFormElement;
})();
