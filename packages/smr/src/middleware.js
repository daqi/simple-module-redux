import smrActions from './actionMap';
import { isSmrAction, isSmrReducer, getSmrName } from './utils';

const smrMiddleware = ({ getState, dispatch }) => next => action => {
  if (isSmrAction(action)) {
    const rootState = getState();
    let name = getSmrName(action);

    const commit = action => {
      if (isSmrReducer(action)) {
        return next(action);
      }

      const smrAction = {
        ...action,
        type: name + '/' + action.type
      };

      if (isSmrReducer(smrAction)) {
        return next(smrAction);
      }

      return next(action);
    };

    const { type, payload, ...extra } = action;
    return smrActions[type](
      {
        rootState,
        state: rootState[name],
        commit,
        dispatch
      },
      payload,
      extra
    );
  }

  return next(action);
};

export default smrMiddleware;
