import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import sessionReducer from './session';
const rootReducer = combineReducers({
  session: sessionReducer
});

let enhancer;

const isDevelopment = process.env.NODE_ENV === 'development';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

if (isDevelopment) enhancer = composeEnhancers(applyMiddleware(thunk, require('redux-logger').default));
else enhancer = applyMiddleware(thunk);

const configureStore = (preloadedState) => createStore(rootReducer, preloadedState, enhancer);

export default configureStore;
