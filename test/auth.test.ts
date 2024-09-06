import { JSDOM } from "jsdom";

import Auth from "../src/public/js/auth/auth";

describe("Input Field Validation", () => {
  let document: Document;
  let auth: Auth;

  beforeEach(() => {
    auth = new Auth();
    const dom = new JSDOM("<!DOCTYPE html><html><body></body></html>");
    document = dom.window.document;
    document.body.innerHTML = `
    <form class="bg-white login-form">
            <h1 class="text-xl capitalise">login</h1>
            <p class="mt-1 text-dark-gray text-sm capitalise">
              add your details below to get back into the app
            </p>
            <div class="mt-2">
              <label for="email" class="font-light">Email address</label>
              <div class="input-wrapper flex">
                <img src="/assets/images/icon-email.svg" alt="email icon" />
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="e.g. alex@email.com "
                />
              </div>
            </div>
            <div class="mt-1">
              <label class="capitalise font-light" for="password"
                >password</label
              >
              <div class="input-wrapper flex">
                <img
                  src="/assets/images/icon-password.svg"
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
              <span class="text-primary">Create Account</span>
            </p>
          </form>
    `;
  });

  test("input should be empty initially", () => {
    const form = document.querySelector(".login-form") as HTMLFormElement;
    const email = form.querySelector("#email") as HTMLInputElement;
    const password = form.querySelector("#password") as HTMLInputElement;
    expect(email.value).toBe("");
    expect(password.value).toBe("");
  });

  test("input field should not be empty after entering a value", () => {
    const form = document.querySelector(".login-form") as HTMLFormElement;
    const email = form.querySelector("#email") as HTMLInputElement;
    const password = form.querySelector("#password") as HTMLInputElement;
    email.value = "alex@email.com";
    password.value = "password";
    expect(email.value).not.toBe("");
    expect(password.value).not.toBe("");
  });

  test("checkIsInputEmpty function should check if input is empty or not", () => {
    const form = document.querySelector(".login-form") as HTMLFormElement;
    const email = form.querySelector("#email") as HTMLInputElement;
    const password = form.querySelector("#password") as HTMLInputElement;
    email.value = "alex@email.com";
    password.value = "password";
    expect(auth.checkIsInputEmpty(email)).toBe(false);
    expect(auth.checkIsInputEmpty(password)).toBe(false);
  });
});
