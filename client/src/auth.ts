import { z } from "zod";

export interface User {
  _id: string;
  email: string;
  isVerified: boolean;
}

const userSchema = z.object({
  _id: z.string(),
  email: z.string().email(),
  isVerified: z.boolean(),
});
export const registerSchema = z
  .object({
    email: z.string().email({ message: "Can't be empty" }),
    password: z.string().min(8, { message: "Please check again" }),
    confirmPassword: z.string().min(8, { message: "Please check again" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z.string().email({ message: "Can't be empty" }),
  password: z.string().min(8, { message: "Please check again" }),
});

export function setCurrentUser(user: User) {
  localStorage.setItem("currentUser", JSON.stringify(user));
}

export function getCurrentUser(): User | null {
  const userJson = localStorage.getItem("currentUser");
  if (!userJson) return null;
  const parsedUser = JSON.parse(userJson);
  const result = userSchema.safeParse(parsedUser);
  return result.success ? result.data : null;
}

class Auth {
  email: string;
  password: string;
  confirmPassword: string;
  constructor(email: string, password: string, confirmPassword: string) {
    this.email = email;
    this.password = password;
    this.confirmPassword = confirmPassword;
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
