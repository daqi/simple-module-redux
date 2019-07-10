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
## Modules ##
```javascript
const modules = {
    [demoModule.name]: demoModule,
    [otherModule.name]: otherModule,
    [listModule.name]: listModule,
    [itemModule.name]: itemModule
}
```

## Usage

### with smrCreateStore

```javascript
import { smrCreateStore } from 'simple-module-redux';
import reduxLogger from 'redux-logger';
const store = smrCreateStore(
    modules,
    preloadedState,
    applyMiddleware(reduxLogger)
);
store.dispatch({
    type: 'number/add',
    payload: 5
});
store.dispatch({
    type: 'number/minus',
    payload: 3
});
store.dispatch({
    type: 'number/asyncUpdate',
    payload: 666
});
```

## Other

### smrMiddleware & generateReducer

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

### smrEnhancer

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
