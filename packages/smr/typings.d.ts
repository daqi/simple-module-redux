import * as Redux from 'redux';

/**
 * A *commit* like a dispatch, but it is only used in the module.
 * S redux state
 * A redux action
 */
type commit<S = any, A extends Redux.Action = Redux.AnyAction> = (
  action: A
) => S;

/**
 * ModuleActionAPI
 * C commit
 * D redux dispatch
 * S redux state
 */
interface ModuleActionAPI<C extends commit, D extends Redux.Dispatch, S = any> {
  commit: commit;
  dispatch: D;
  state: S;
  rootState: S;
}

/**
 * ModuleAction
 * D redux dispatch
 * S redux state
 */
type ModuleAction<S = any, D extends Dispatch = Dispatch> = (
  api: ModuleActionAPI<D, S>,
  payload: any
) => S;

/**
 * ModuleReducer
 * S redux state
 */
type ModuleReducer<S = any> = (state: S, payload: any) => S;

/**
 * ModuleReducers
 * S redux state
 */
type ModuleReducers<S = any> = {
  [key: string]: ModuleReducer;
};

/**
 * ModuleActions
 * S redux state
 */
type ModuleActions<S = any> = {
  [key: string]: ModuleAction;
};

/**
 * Module
 * S redux state
 */
export interface Module<S = any> {
  name: string;
  state: S;
  reducers?: ModuleReducers<S>;
  actions?: ModuleReducers<S>;
}

/**
 * Modules
 * S redux state
 */
export type Modules = {
  [key: string]: Module;
};
