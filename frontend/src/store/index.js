import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import sessionReducer from './session';
const rootReducer = combineReducers({
  session: sessionReducer
});

const isNotProduction = process.env.NODE_ENV !== 'production';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = isNotProduction
  ? composeEnhancers(applyMiddleware(thunk, require('redux-logger').default))
  : applyMiddleware(thunk);

const configureStore = (preloadedState) => createStore(rootReducer, preloadedState, enhancer);

export default configureStore;
