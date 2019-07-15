import { applyMiddleware } from 'redux';

import generateReducer from './generateReducer';
import smrMiddleware from './middleware';

import * as Smr from '../typings'

export const smrEnhancerWithPlugin: Smr.SmrEnhancerWithPlugin = function(plugins) {
  return createStore => {
    return (modules, preloadedState) => {
      const reducer = generateReducer(modules, plugins);
      const enhancer = applyMiddleware(smrMiddleware);

      return enhancer(createStore)(reducer, preloadedState);
    };
  }
}

const smrEnhancer = smrEnhancerWithPlugin();

export default smrEnhancer;
