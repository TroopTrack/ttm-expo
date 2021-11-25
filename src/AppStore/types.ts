import { SuccessfulLogin } from "../Appy";

interface Ready {
  kind: "ready";
}

interface LoggedIn {
  kind: "logged-in";
  login: SuccessfulLogin;
}

interface LoggedOut {
  kind: "logged-out";
}

interface ForgotPassWordUserName {
  kind: "forgot-password-username";
}

interface SignUp {
  kind: "sign-up";
}

export const loggedOut = (): LoggedOut => ({ kind: "logged-out" });
export const loggedIn = (login: SuccessfulLogin): LoggedIn => ({
  kind: "logged-in",
  login,
});
export const forgotPasswordUsername = (): ForgotPassWordUserName => ({
  kind: "forgot-password-username",
});

export const signup = (): SignUp => ({
  kind: "sign-up",
});

export const ready = (): Ready => ({ kind: "ready" });

export type UserState = LoggedIn | LoggedOut | ForgotPassWordUserName | Ready | SignUp;
