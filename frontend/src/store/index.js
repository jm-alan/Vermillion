import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({});

const isProduction = process.env.NODE_ENV === 'production';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = isProduction
  ? applyMiddleware(thunk)
  : composeEnhancers(applyMiddleware(thunk, require('redux-logger').default));

const configureStore = (preloadedState) => createStore(rootReducer, preloadedState, enhancer);

export default configureStore;
