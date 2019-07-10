import smrActions from './actionMap';
import smrReducers from './reducerMap';

export function isSmrAction(action) {
  return action.type && smrActions[action.type];
}
export function isSmrReducer(action) {
  return action.type && smrReducers[action.type];
}

export function getSmrName(action) {
  return isSmrAction(action) ? action.type.split('/')[0] : '';
}

export function smrNameCheck(name, type) {
  const typeStr = type ? type + ' ' : '';
  if (!name) {
    throw new Error(`${typeStr}name is required`);
  }
  if (name.indexOf('/') >= 0) {
    throw new Error(`${typeStr}name can not has "/"`);
  }
  if (name.indexOf(' ') >= 0) {
    throw new Error(`${typeStr}name can not has " "`);
  }
}

/**
 * @param {any} obj The object to inspect.
 * @returns {boolean} True if the argument appears to be a plain object.
 */
export function isPlainObject(obj) {
  if (typeof obj !== 'object' || obj === null) return false;

  let proto = obj;
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }

  return Object.getPrototypeOf(obj) === proto;
}
