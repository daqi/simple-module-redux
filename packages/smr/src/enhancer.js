import { applyMiddleware } from 'redux';

import generateReducer from './generateReducer';
import smrMiddleware from './middleware';

export function smrEnhancerWidthPlugin(plugins) {
  return createStore => {
    return (modules, preloadedState) => {
      const reducer = generateReducer(modules, plugins);
      const enhancer = applyMiddleware(smrMiddleware);

      return enhancer(createStore)(reducer, preloadedState);
    };
  };
}

const smrEnhancer = smrEnhancerWidthPlugin();

export default smrEnhancer;
