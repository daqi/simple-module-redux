import * as Smr from '../typings';

import smrActions from './actionMap';
import smrReducers from './reducerMap';

export const isSmrAction: Smr.IsSmrAction = function(action) {
  return 'type' in action && action.type in smrActions;
};
export const isSmrReducer: Smr.IsSmrReducer = function(action) {
  return 'type' in action && action.type in smrReducers;
};

export const getSmrName: Smr.GetSmrName = function(action) {
  return isSmrAction(action) ? action.type.split('/')[0] : '';
};

export const smrNameCheck: Smr.SmrNameCheck = function(name, type) {
  const typeStr = type ? type + ' ' : '';

  if (!name) {
    throw new Error(`${typeStr}name is required.`);
  }

  if (name.indexOf('/') >= 0) {
    throw new Error(`${typeStr}name can not has "/".`);
  }

  if (name.indexOf(' ') >= 0) {
    throw new Error(`${typeStr}name can not has " ".`);
  }
};

export const isPlainObject: Smr.IsPlainObject = function(obj) {
  if (typeof obj !== 'object' || obj === null) return false;

  let proto = obj;
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }

  return Object.getPrototypeOf(obj) === proto;
};
