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
}

export default Auth;
