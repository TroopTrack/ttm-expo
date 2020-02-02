interface Offline {
  kind: 'offline';
}

interface Online {
  kind: 'online';
}

export type NetworkState = Offline | Online;

interface LoggedIn {
  kind: 'logged-in';
  accessToken: string;
}

interface LoggedOut {
  kind: 'logged-out';
}

export const loggedOut = (): LoggedOut => ({ kind: 'logged-out' });
export const loggedIn = (accessToken: string): LoggedIn => ({
  kind: 'logged-in',
  accessToken,
});

export const online = (): Online => ({ kind: 'online' });
export const offline = (): Offline => ({ kind: 'offline' });

export type UserState = LoggedIn | LoggedOut;
