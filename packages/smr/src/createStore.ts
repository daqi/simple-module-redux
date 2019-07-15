import { createStore, applyMiddleware, compose } from 'redux';

import generateReducer from './generateReducer';
import smrMiddleware from './middleware';

import * as Smr from '../typings';

export const smrCreateStoreWithPlugin: Smr.SmrCreateStoreWithPlugin = function(plugins) {
  return function(modules, preloadedState, enhancer) {
    const reducer = generateReducer(modules, plugins);
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
  };
}

const smrCreateStore = smrCreateStoreWithPlugin();

export default smrCreateStore;
