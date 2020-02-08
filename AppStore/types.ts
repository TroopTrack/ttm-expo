import { SuccessfulLogin } from '../Appy';

interface Offline {
  kind: 'offline';
}

interface Online {
  kind: 'online';
}

export type NetworkState = Offline | Online;

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

export const online = (): Online => ({ kind: 'online' });
export const offline = (): Offline => ({ kind: 'offline' });

export type UserState = LoggedIn | LoggedOut;
