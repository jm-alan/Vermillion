import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import sessionReducer from './session';
const rootReducer = combineReducers({
  session: sessionReducer
});

let enhancer;

const isNotProduction = process.env.NODE_ENV !== 'production';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

if (isNotProduction) enhancer = composeEnhancers(applyMiddleware(thunk, require('redux-logger').default));
else enhancer = applyMiddleware(thunk);

const configureStore = (preloadedState) => createStore(rootReducer, preloadedState, enhancer);

export default configureStore;
