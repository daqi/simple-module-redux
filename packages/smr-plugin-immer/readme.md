# smr-plugin-immer

a plugin of simple-module-redux

## Installation

```
npm install smr-plugin-immer
```

## Usage

### use smrCreateStore

```javascript
import { smrCreateStoreWithPlugin } from 'simple-module-redux';
import withImmer from 'smr-plugin-immer';
import reduxLogger from 'redux-logger';
const smrCreateStore = smrCreateStoreWithPlugin([withImmer()]);
const store = smrCreateStore(
  modules,
  preloadedState,
  applyMiddleware(reduxLogger)
);
```

### use smrEnhancer

```javascript
import { createStore, compose } from 'redux';
import { smrEnhancerWidthPlugin } from 'simple-module-redux';
import withImmer from 'smr-plugin-immer';
import reduxLogger from 'redux-logger';
import modules from './modules';
const smrEnhancer = smrEnhancerWidthPlugin([withImmer()]);
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
import reduxLogger from 'redux-logger';
import modules from './modules';
const reducer = generateReducer(modules, [withImmer()]);
const store = createStore(
  reducer,
  preloadedState,
  applyMiddleware(smrMiddleware, reduxLogger)
);
```

### config

```javascript
const useImmer = withImmer(config);

const config = { whitelist: ['foo/bar'] };
// or
const config = { blacklist: ['foo/bar'] };
// or
const config = {
  whitelist: actionName => {
    actionName.indexOf('foo') > 0;
  }
};
// or
const config = {
  blacklist: actionName => {
    actionName.indexOf('foo') > 0;
  }
};
```
