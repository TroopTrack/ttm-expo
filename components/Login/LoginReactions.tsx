import Task from 'taskarian';
import LoginStore, { LoginState } from './store';
import ErrorActionableReaction, {
  EAProps,
} from '../../ErrorActionableReaction';
import { login, AppyError, SuccessfulLogin } from '../../Appy';
import { toHttpTask } from 'ajaxian';

export interface Props extends EAProps<LoginStore> {
  store: LoginStore;
}

type LoginError = AppyError;

const handleLoginError = (store: LoginStore) => (error: LoginError) => {
  console.log(error);
  store.error('Login failed');
};

const handleLoginSuccess = (store: LoginStore) => (login: SuccessfulLogin) => {
  console.log(login);
};

class LoginReactions extends ErrorActionableReaction<
  LoginStore,
  LoginState,
  Props
> {
  scrollHeight: number;
  tester = () => this.props.store.state;

  effect = (state: LoginState) => {
    const { store } = this.props;
    console.log('Reactions: ', state.kind);
    switch (state.kind) {
      case 'ready':
        break;
      case 'submitted':
        store.error('Check');
        toHttpTask(
          login({
            username: state.userName,
            password: state.password,
          })
        ).fork(handleLoginError(store), handleLoginSuccess(store));
      case 'error':
        break;
    }
  };
}

export default LoginReactions;
