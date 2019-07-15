import * as Redux from 'redux';

/**
 * A *commit* like a dispatch, but it is only used in the module.
 * S redux state
 * A redux action
 */
export interface Commit<A extends Redux.Action = Redux.AnyAction> {
  <T extends A>(action: T): T;
}

/**
 * SmrActionAPI
 * C commit
 * D redux dispatch
 * S redux state
 */
export interface SmrActionAPI<
  D extends Redux.Dispatch = Redux.Dispatch,
  S = any
> {
  commit: Commit;
  dispatch: D;
  state: S;
  rootState: S;
}

/**
 * smrAction
 * D redux dispatch
 * S redux state
 */
export type smrAction = (api: SmrActionAPI, payload?: any, extra?: any) => any;

/**
 * smrReducer
 * S redux state
 */
export type smrReducer<S = any> = (state: S, payload?: any, extra?: any) => S;

/**
 * SmrReducers
 * S redux state
 */
export interface SmrReducers {
  [key: string]: smrReducer;
}

/**
 * SmrActions
 * S redux state
 */
export interface SmrActions {
  [key: string]: smrAction;
}

/**
 * Module
 * S redux state
 */
export interface Module {
  name: string;
  state: any;
  reducers?: SmrReducers;
  actions?: SmrActions;
}

/**
 * Modules
 * S redux state
 */
export type Modules = {
  [key: string]: Module;
};

/**
 *  utils
 */
export interface IsSmrAction<A extends Redux.Action = Redux.AnyAction> {
  (action: A): boolean;
}
export interface IsSmrReducer<A extends Redux.Action = Redux.AnyAction> {
  (action: A): boolean;
}

export interface GetSmrName<A extends Redux.Action = Redux.AnyAction> {
  (action: A): string;
}

export interface SmrNameCheck {
  (name: string, type?: string): void;
}

/**
 * @param {any} obj The object to inspect.
 * @returns {boolean} True if the argument appears to be a plain object.
 */
export interface IsPlainObject<A = any> {
  (obj: A): boolean;
}

export interface SmrPlugin {
  <M extends Module>(module: Module): M;
}

export interface GenerateSmrReducer {
  (module: Module): Redux.Reducer;
}

export interface GenerateSmrReducers {
  (modules: Modules, plugins?: SmrPlugin[]): Redux.Reducer;
}

export interface SmrEnhancerWithPlugin {
  (plugins?: SmrPlugin[]): SmrStoreEnhancer;
}

export interface SmrStoreEnhancer {
  (next: Redux.StoreEnhancerStoreCreator): SmrStoreEnhancerStoreCreator;
}

export interface SmrStoreEnhancerStoreCreator {
  (modules: Modules, preloadedState?: Redux.DeepPartial<any>): Redux.Store;
}

export interface SmrCreateStoreWithPlugin {
  (plugins?: SmrPlugin[]): SmrCreateStore;
}

export interface SmrCreateStore {
  (modules: Modules, ...arg: any[]): Redux.Store;
}
