import { Maybe } from 'maybeasy';
import { AppyError } from '../Appy';
import { handleAppyError } from '../ErrorHandling';
import { FlashAlert } from '../Notifications/Types';
import ReactionComponent, { RCProps } from '../ReactionComponent';

export interface NotifiableStore {
  notification: Maybe<FlashAlert>;
}
export interface ErrorActionable {
  error: (errorMessage: string) => void;
}

export interface EAProps<Store extends NotifiableStore>
  extends RCProps<Store> {}

export const handleError = <Store extends ErrorActionable>(
  store: Store,
  error: AppyError
) => {
  store.error(handleAppyError(error));
};

abstract class ErrorActionableReaction<
  Store extends NotifiableStore,
  ObservedState,
  P extends EAProps<Store>
> extends ReactionComponent<Store, ObservedState, P> {}

export default ErrorActionableReaction;
