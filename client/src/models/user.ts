export interface IUser {
  email: string;
  authentication: {
    password: string;
    salt: string;
    sessionToken: string;
  };
  isVerified: boolean;
  verificationToken: string | undefined;
}
