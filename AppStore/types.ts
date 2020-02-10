import { SuccessfulLogin } from '../Appy';

interface LoggedIn {
  kind: 'logged-in';
  login: SuccessfulLogin;
}

interface LoggedOut {
  kind: 'logged-out';
}

export const loggedOut = (): LoggedOut => ({ kind: 'logged-out' });
export const loggedIn = (login: SuccessfulLogin): LoggedIn => ({
  kind: 'logged-in',
  login,
});

export type UserState = LoggedIn | LoggedOut;
