import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import sessionReducer from './session';
const rootReducer = combineReducers({
  session: sessionReducer
});

const enhancer = applyMiddleware(thunk);

const configureStore = (preloadedState) => createStore(rootReducer, preloadedState, enhancer);

export default configureStore;
