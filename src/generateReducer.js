import { combineReducers } from 'redux';
import smrActions from './actionMap';
import smrReducers from './reducerMap';
import { smrNameCheck, isSmrReducer, isPlainObject } from './utils';

export function generateSmrReducer(module) {
  const { name, state: oState, actions, reducers } = module;

  if (!isPlainObject(module)) {
    throw new Error('module must be plain objects.');
  }

  smrNameCheck(name);

  if (!isPlainObject(oState)) {
    throw new Error('module.state must be plain objects.');
  }

  if (!isPlainObject(actions)) {
    throw new Error('module.actions must be plain objects.');
  }

  if (!isPlainObject(reducers)) {
    throw new Error('module.reducers must be plain objects.');
  }

  for (let key in actions) {
    smrNameCheck(key, 'action');
    const type = name + '/' + key;
    smrActions[type] = actions[key];
  }

  for (let key in reducers) {
    smrNameCheck(key, 'reducer');
    const type = name + '/' + key;
    smrReducers[type] = reducers[key];
  }

  return function(state, action) {
    if (isSmrReducer(action)) {
      state = smrReducers[action.type](state, action.payload);
    }

    if (!state) {
      state = oState;
    }

    return state;
  };
}

export default function generateSmrReducers(modules) {
  if (!isPlainObject(modules)) {
    throw new Error('Modules must be plain objects.');
  }

  const reducers = {};
  Object.keys(modules).forEach(key => {
    if (modules.name in reducers) {
      throw new Error(`modules.name ${modules.name} is duplicated.`);
    }
    reducers[modules.name] = generateSmrReducer(modules[key]);
  });

  return combineReducers(reducers);
}
