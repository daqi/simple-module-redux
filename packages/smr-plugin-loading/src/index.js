const SHOW = '@@LOADING/SHOW';
const HIDE = '@@LOADING/HIDE';

export const LoadingModule = {
  name: 'loading',
  state: {
    global: 0 // 全局
  },
  reducers: {
    [SHOW](state, payload) {
      const { global, ...restState } = state;
      return {
        ...restState,
        global: global + 1,
        [payload.actionName]: true
      };
    },
    [HIDE](state, payload) {
      const { global, ...restState } = state;
      return {
        ...restState,
        global: global - 1,
        [payload.actionName]: false
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
          // if res is Promise
          if (res && res instanceof Promise) {
            args[0].commit(SHOW, { actionName: key });
            res.finally(() => {
              args[0].commit(HIDE, { actionName: key });
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
