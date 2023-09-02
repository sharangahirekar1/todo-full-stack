import reducer from './store/reducer';
import {legacy_createStore,applyMiddleware,compose} from 'redux';
import thunk from 'redux-thunk';

let composeEnhancer = compose;

if(process.env.NODE_ENV === 'production') {
    composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose 
}



export const store = legacy_createStore(reducer,composeEnhancer(applyMiddleware(thunk)));