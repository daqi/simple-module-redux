import { combineReducers, compose } from 'redux';
import smrActions from './actionMap';
import smrReducers from './reducerMap';
import { smrNameCheck, isSmrReducer, isPlainObject } from './utils';

import * as Redux from 'redux';
import * as Smr from '../typings';

export const generateSmrReducer: Smr.GenerateSmrReducer = function(module) {
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

  if (actions) {
    for (let key in actions) {
      smrNameCheck(key, 'action');
      const type = name + '/' + key;
      smrActions[type] = actions[key];
    }
  }

  if (reducers) {
    for (let key in reducers) {
      // 支持跨module reducer
      if (key.indexOf('/') > 0) {
        const _name = key.split('/')[0];
        if (_name === name) {
          throw new Error('current module reducer name can not has "/".');
        }
        const prevReducer = smrReducers[key];
        const currentReducer = reducers[key];
        if (prevReducer) {
          smrReducers[key] = (...arg) => {
            currentReducer(...arg);
            prevReducer(...arg);
          };
        } else {
          smrReducers[key] = currentReducer;
        }
      } else {
        smrNameCheck(key, 'reducer');
        const type = name + '/' + key;
        smrReducers[type] = reducers[key];
      }
    }
  }

  const reducer: Redux.Reducer = (state = oState, action) => {
    if (isSmrReducer(action) && action.type.indexOf(name + '/') === 0) {
      const { type, payload, ...extra } = action;
      state = smrReducers[type](state, payload, extra);
    }

    if (!isPlainObject(state)) {
      throw new Error('next state must be plain objects.');
    }

    return state;
  };
  return reducer;
};

const generateSmrReducers: Smr.GenerateSmrReducers = function(
  modules,
  plugins = []
) {
  if (!isPlainObject(modules)) {
    throw new Error('Modules must be plain objects.');
  }

  const reducers: Redux.ReducersMapObject = {};
  Object.keys(modules).forEach(key => {
    const module = modules[key];
    if (module.name in reducers) {
      throw new Error(`modules.name ${module.name} is duplicated.`);
    }
    const wrapper: Smr.SmrPlugin = compose(...plugins);
    reducers[module.name] = generateSmrReducer(wrapper(module));
  });

  return combineReducers(reducers);
};

export default generateSmrReducers;
