const SHOW = 'SHOW';
const HIDE = 'HIDE';
const moduleName = '@@SMRLoading';

export const LoadingModule = {
  name: moduleName,
  state: {
    global: 0 // 全局
  },
  reducers: {
    [SHOW](state, payload) {
      return {
        ...state,
        global: state.global + 1,
        [payload]: true
      };
    },
    [HIDE](state, payload) {
      return {
        ...state,
        global: state.global - 1,
        [payload]: false
      };
    }
  },
  actions: {}
};

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
export default function withLoading(config = {}) {
  return function useLoading(Module) {
    // console.log('useLoading')
    if (!Module) return;
    Module.__useLoading = true;
    if (Module.actions) {
      Object.keys(Module.actions).forEach(key => {
        if (!valid(config, key)) return;
        const originAction = Module.actions[key];
        Module.actions[key] = (...args) => {
          const res = originAction(...args);
          const { dispatch } = args[0];
          // if res is Promise
          if (res && res instanceof Promise) {
            dispatch({ type: moduleName + '/' + SHOW, payload: key });
            res.finally(() => {
              dispatch({ type: moduleName + '/' + HIDE, payload: key });
            });
          }

          return res;
        };
        Module.actions[key].originAction = originAction;
      });
    }

    if (Module.modules) {
      Object.keys(Module.modules).forEach(key => {
        Module.modules[key] = useLoading(Module.modules[key]);
      });
    }

    return Module;
  };
}
