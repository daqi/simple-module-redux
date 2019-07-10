import { applyMiddleware } from 'redux';

import generateReducer from './generateReducer';
import smrMiddleware from './middleware';

export default function smrEnhancer(createStore) {
  return (modules, preloadedState) => {
    const reducer = generateReducer(modules);
    const enhancer = applyMiddleware(smrMiddleware);
    return enhancer(createStore)(reducer, preloadedState);
  };
}
