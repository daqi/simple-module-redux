import smrActions from './actionMap';
import { isSmrAction, getSmrName } from './utils';

const smrMiddleware = ({ getState }) => next => action => {
  if (isSmrAction(action)) {
    const rootState = getState();
    let name = getSmrName(action);
    return smrActions[action.type](
      {
        rootState,
        state: rootState[name],
        commit: ({ type, payload }) => {
          next({ type: name + '/' + type, payload });
        }
      },
      action.payload
    );
  }

  return next(action);
};

export default smrMiddleware;
