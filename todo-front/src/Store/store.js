import {legacy_createStore} from 'redux';
import reducer from './reducer';

export const initState = {
    isLoading:false,
    isError:false,
    todo:[{id:1,title:"Why React  .1",desc:"React is a UI library with full power of javascript",isCompleted:false},{id:2,title:"Why React  .2",desc:"React uses JSX to create modular interfaces",isCompleted:true}]
}

export const store = legacy_createStore(reducer,initState);

