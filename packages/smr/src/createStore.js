import { createStore, applyMiddleware, compose } from 'redux';

import generateReducer from './generateReducer';
import smrMiddleware from './middleware';

export default function smrCreateStore(modules, preloadedState, enhancer) {
  const reducer = generateReducer(modules);

  if (
    typeof preloadedState === 'function' &&
        typeof enhancer === 'undefined'
  ) {
    enhancer = preloadedState;
    preloadedState = undefined;
  }

  const smrEnhancer = applyMiddleware(smrMiddleware);

  if (typeof enhancer !== 'undefined') {
    enhancer = compose(
      applyMiddleware(smrMiddleware),
      enhancer
    );
  } else {
    enhancer = smrEnhancer;
  }

  return createStore(reducer, preloadedState, enhancer);
}
