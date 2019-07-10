# simple-module-redux

## Installation

```
npm install simple-module-redux
```

## Module

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
            asyncFn(payload).then(res => {
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

## Usage

### with smrCreateStore

```javascript
import { smrCreateStore } from 'simple-module-redux';
const store = smrCreateStore(
    modules,
    preloadedState,
    applyMiddleware(reduxLogger)
);
```

## Other

### smrMiddleware & generateReducer

```javascript
import { createStore, applyMiddleware } from 'redux';
import { smrMiddleware } from 'simple-module-redux';
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
