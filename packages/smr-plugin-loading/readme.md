# smr-plugin-loading

a plugin of simple-module-redux

## Installation

```
npm install smr-plugin-loading
```

## Usage

### use smrCreateStore

```javascript
import { smrCreateStoreWithPlugin } from 'simple-module-redux';
import withLoading, { LoadingModule } from 'smr-plugin-loading';
import reduxLogger from 'redux-logger';
import modules from './modules';
modules[LoadingModule.name] = LoadingModule;
const smrCreateStore = smrCreateStoreWithPlugin([withLoading()]);
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
import withLoading, { LoadingModule } from 'smr-plugin-loading';
import reduxLogger from 'redux-logger';
import modules from './modules';
modules[LoadingModule.name] = LoadingModule;
const smrEnhancer = smrEnhancerWidthPlugin([withLoading()]);
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
import withLoading, { LoadingModule } from 'smr-plugin-loading';
import reduxLogger from 'redux-logger';
import modules from './modules';
modules[LoadingModule.name] = LoadingModule;
const reducer = generateReducer(modules, [withLoading()]);
const store = createStore(
  reducer,
  preloadedState,
  applyMiddleware(smrMiddleware, reduxLogger)
);
```

### config

```javascript
const useLoading = withLoading(config);

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
