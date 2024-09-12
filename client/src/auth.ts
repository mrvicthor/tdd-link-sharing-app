class Auth {
  email: string;
  password: string;
  confirmPassword: string;
  constructor(email: string, password: string, confirmPassword: string) {
    this.email = email;
    this.password = password;
    this.confirmPassword = confirmPassword;
  }

  checkIfEmpty(input: HTMLInputElement): boolean {
    return input.value !== "";
  }

  handleInputChange(e: Event) {
    console.log("trigger");
    const target = e.target as HTMLInputElement;
    const parent = target.parentElement;
    if (parent) {
      parent?.classList.remove("error-wrapper");
      parent?.classList.add("input-wrapper");
      parent?.parentElement
        ?.querySelector(`label[for="${target.id}"]`)
        ?.classList.remove("error-message");
      parent.parentElement
        ?.querySelector("p.error-message")
        ?.classList.add("hide");
    }
  }

  clearError(parent: HTMLElement, message: string) {
    if (message) {
      parent?.classList.remove("input-wrapper");
      parent?.classList.add("error-wrapper");
    } else {
      parent?.classList.remove("error-wrapper");
      parent?.classList.add("input-wrapper");
    }
  }
}

export default Auth;
