export default function EmailVerification(): string {
  return `
  <h1>Email Verification</h1>
  <p>Please check your email to verify your account</p>
  <p>If you did not receive an email, please check your spam folder</p>
  <button class="mt-1 btn btn-primary btn-large capitalise font-bold resend-verification-email">
    Verification Email
  </button>
  `;
}

export function initEmailVerification() {
  console.log("init email verification");
  const verifyButton = document.querySelector<HTMLButtonElement>(
    ".resend-verification-email"
  )!;
  const serverUrl = "http://localhost:8080";
  verifyButton.addEventListener("click", () => {
    const url = window.location.href;
    const token = url.split("/").pop();
    fetch(`${serverUrl}/auth/verify/${token}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
  });
}
