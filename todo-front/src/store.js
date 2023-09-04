import {legacy_createStore, combineReducers,applyMiddleware,compose} from 'redux';
import thunk from 'redux-thunk';
import { todoReducer } from './Todo/state/reducer';
import { userReducer } from './Account/state/reducer';

let composeEnhancer = compose;

const rootReducer = combineReducers({
    todo:todoReducer,
    user:userReducer,
})

if(process.env.NODE_ENV === 'production') {
    composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose 
}



export const store = legacy_createStore(rootReducer,composeEnhancer(applyMiddleware(thunk)));