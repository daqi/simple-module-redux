# simple-module-redux

## Installation

```
npm install simple-module-redux
```

## Module { name, state, reducers, actions }

```javascript
const asyncFn = payload => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ number: 666 + payload });
    }, 2000);
  });
};
const moduleDemo = {
  name: 'demo',
  state: {
    number: 1
  },
  reducers: {
    save(state, payload) {
      return { ...state, ...payload };
    }
  },
  actions: {
    add({ commit, state }, payload) {
      commit({
        type: 'save',
        payload: { number: state.number + payload }
      });
    },
    minus({ commit, state }, payload) {
      commit({
        type: 'save',
        payload: { number: state.number - payload }
      });
    },
    asyncUpdate({ commit, state }, payload) {
      return asyncFn(payload).then(res => {
        commit({
          type: 'save',
          payload: { number: res.number }
        });
        return res;
      });
    }
  }
};
```

## Modules

```javascript
const modules = {
  [demoModule.name]: demoModule,
  [otherModule.name]: otherModule
  // ...
};
```

## Usage

### use smrCreateStore

```javascript
import { smrCreateStore } from 'simple-module-redux';
import reduxLogger from 'redux-logger';
const store = smrCreateStore(
  modules,
  preloadedState,
  applyMiddleware(reduxLogger)
);
store.dispatch({
  type: 'demo/add',
  payload: 5
});
store.dispatch({
  type: 'demo/minus',
  payload: 3
});
store.dispatch({
  type: 'demo/asyncUpdate',
  payload: 666
});
```

### use smrEnhancer

```javascript
import { createStore, compose } from 'redux';
import { smrEnhancer } from 'simple-module-redux';
import reduxLogger from 'redux-logger';
import modules from './modules';
const store = createStore(
  modules,
  preloadedState,
  compose(
    smrEnhancer,
    applyMiddleware(reduxLogger)
  )
);
```

### use smrMiddleware & generateReducer

```javascript
import { createStore, applyMiddleware } from 'redux';
import { smrMiddleware, generateReducer } from 'simple-module-redux';
import reduxLogger from 'redux-logger';
import modules from './modules';
const reducer = generateReducer(modules);
const store = createStore(
  reducer,
  preloadedState,
  applyMiddleware(smrMiddleware, reduxLogger)
);
```

## plugins

`smr-plugin-immer`, `smr-plugin-loading`

### use smrCreateStoreWithPlugin

```javascript
import { smrCreateStoreWithPlugin } from 'simple-module-redux';
import withImmer from 'smr-plugin-immer';
import withLoading from 'smr-plugin-loading';
import reduxLogger from 'redux-logger';
const smrCreateStore = smrCreateStoreWithPlugin([withImmer(), withLoading()]);
const store = smrCreateStore(
  modules,
  preloadedState,
  applyMiddleware(reduxLogger)
);
```

### use smrEnhancerWidthPlugin

```javascript
import { createStore, compose } from 'redux';
import { smrEnhancerWidthPlugin } from 'simple-module-redux';
import withImmer from 'smr-plugin-immer';
import withLoading from 'smr-plugin-loading';
import reduxLogger from 'redux-logger';
import modules from './modules';
const smrEnhancer = smrEnhancerWidthPlugin([withImmer(), withLoading()]);
const store = createStore(
  modules,
  preloadedState,
  compose(
    smrEnhancer,
    applyMiddleware(reduxLogger)
  )
);
```

### use smrMiddleware & generateReducer

```javascript
import { createStore, applyMiddleware } from 'redux';
import { smrMiddleware, generateReducer } from 'simple-module-redux';
import withImmer from 'smr-plugin-immer';
import withLoading from 'smr-plugin-loading';
import reduxLogger from 'redux-logger';
import modules from './modules';
const reducer = generateReducer(modules, [withImmer(), withLoading()]);
const store = createStore(
  reducer,
  preloadedState,
  applyMiddleware(smrMiddleware, reduxLogger)
);
```
