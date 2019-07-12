import smrActions from './actionMap';
import { isSmrAction, getSmrName } from './utils';

const smrMiddleware = ({ getState, dispatch }) => next => action => {
  if (isSmrAction(action)) {
    const rootState = getState();
    let name = getSmrName(action);

    const commit = action => {
      if (isSmrAction(action)) {
        return dispatch(action);
      }

      const smrAction = {
        ...action,
        type: name + '/' + action.type
      };

      if (isSmrAction(smrAction)) {
        return dispatch(smrAction);
      }

      return dispatch(action);
    };

    const { type, ...otherArgs } = action;
    return smrActions[type](
      {
        rootState,
        state: rootState[name],
        commit,
        dispatch
      },
      ...otherArgs
    );
  }

  return next(action);
};

export default smrMiddleware;
