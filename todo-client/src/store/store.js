import {legacy_createStore,compose, applyMiddleware} from 'redux';
import reducer from './reducer';
import thunk from 'redux-thunk';

let composeEnhancers = compose;

if(process.env.NODE_ENV !== "production"){
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;
}

const enhancer = composeEnhancers(applyMiddleware(thunk));


export const store = legacy_createStore(reducer,enhancer);
