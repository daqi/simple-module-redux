import produce from 'immer';

/**
 * 使用方法：
 * ```
 *  modules: {
 *    LoadingModule,
 *    app: withImmer(AppModule),
 *  }
 * ```
 * reducer
 * ```
 * reducers: {
 *   ['XXXXX_SAVE'](state, payload) {
 *    return { ...state, ...payload };
 *   },
 *   ['XXXXX_SETIN'](state, { path, value }) {
 *    return _set(state, path, value);
 *   },
 * }
 * ```
 */
const isArr = Array.isArray;
const isFunc = el => typeof el === 'function';

function valid(config, key) {
  if (config.whitelist) {
    if (isArr(config.whitelist) && !config.whitelist.includes(key)) {
      return false;
    }
    if (isFunc(config.whitelist) && !config.whitelist.some(key)) {
      return false;
    }
  }
  if (config.blacklist) {
    if (isArr(config.blacklist) && config.blacklist.includes(key)) {
      return false;
    }
    if (isFunc(config.blacklist) && config.blacklist.some(key)) {
      return false;
    }
  }
  return true;
}

/**
 * @param config: { whitelist: [ actionName ], blacklist: [ actionName ] }
 */
export default function withImmer(config = {}) {
  return function useImmer(Module) {
    // console.log('withImmer')
    if (!Module) return;
    Module.__withImmer = true;
    if (Module.reducers) {
      Object.keys(Module.reducers).forEach(key => {
        const originReducer = Module.reducers[key];
        if (!valid(config, key)) return;
        Module.reducers[key] = (state, payload) => {
          if (typeof state === 'object') {
            const ret = produce(state, draft => {
              const next = originReducer(draft, payload);
              if (typeof next === 'object') {
                return next;
              }
            });
            return ret === undefined ? {} : ret;
          } else {
            return originReducer(state, payload);
          }
        };
        Module.reducers[key].originReducer = originReducer;
      });
    }

    if (Module.modules) {
      Object.keys(Module.modules).forEach(key => {
        Module.modules[key] = useImmer(Module.modules[key]);
      });
    }

    return Module;
  };
}
