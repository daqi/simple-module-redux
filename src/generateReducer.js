import { combineReducers } from 'redux';
import smrActions from './actionMap';
import smrReducers from './reducerMap';
import { smrNameCheck, isSmrReducer, isPlainObject } from './utils';

export function generateSmrReducer(module) {
  if (!isPlainObject(module)) {
    throw new Error('module must be plain objects. ');
  }
  const name = module.name;
  smrNameCheck(name);
  for (let key in module.actions) {
    smrNameCheck(key, 'action');
    const type = name + '/' + key;
    smrActions[type] = module.actions[key];
  }
  for (let key in module.reducers) {
    smrNameCheck(key, 'reducer');
    const type = name + '/' + key;
    smrReducers[type] = module.reducers[key];
  }
  return function(state, action) {
    if (isSmrReducer(action)) {
      state = smrReducers[action.type](state, action.payload);
    }
    if (!state) {
      state = module.state;
    }
    return state;
  };
}

export default function generateSmrReducers(modules) {
  if (!isPlainObject(modules)) {
    throw new Error('Modules must be plain objects. ');
  }
  const reducers = {};
  Object.keys(modules).forEach(key => {
    reducers[key] = generateSmrReducer(modules[key]);
  });
  return combineReducers(reducers);
}
