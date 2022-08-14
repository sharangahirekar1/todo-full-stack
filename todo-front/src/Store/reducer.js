import {TODO_GET_REQUEST} from './types';
import {TODO_GET_SUCCESS} from './types';
import {TODO_GET_ERROR} from './types';
import {TODO_POST_REQUEST} from './types';
import {TODO_POST_SUCCESS} from './types';
import {TODO_POST_ERROR} from './types';
import {TODO_DELETE_REQUEST} from './types';
import {TODO_DELETE_SUCCESS} from './types';
import {TODO_DELETE_ERROR} from './types';
import {TODO_PATCH_REQUEST} from './types';
import {TODO_PATCH_SUCCESS} from './types';
import {TODO_PATCH_ERROR} from './types';

const initState = {
    isLoading:false,
    isError:false,
    todo:[{id:1,title:"Why React  .1",desc:"React is a UI library with full power of javascript",isCompleted:false},{id:2,title:"Why React  .2",desc:"React uses JSX to create modular interfaces",isCompleted:true}]
}

const reducer = (state=initState,action)=>{
   switch(action.type){
    case TODO_GET_REQUEST:{
        return {...state,isLoading:true,isError:false}
    }
    case TODO_GET_SUCCESS:{
        return {...state,isLoading:false,todo:action.payload}
    }
    case TODO_GET_ERROR:{
        return {...state,isLoading:false,isError:true}
    }
    case TODO_POST_REQUEST:{
        return {...state,isLoading:true,isError:false}
    }
    case TODO_POST_SUCCESS:{
        return {...state,isLoading:false,todo:[...state.todo,action.payload]}
    }
    case TODO_POST_ERROR:{
        return {...state,isLoading:false,isError:true}
    }
    case TODO_DELETE_REQUEST:{
        return {...state,isLoading:true,isError:false}
    }
    case TODO_DELETE_SUCCESS:{
        return {...state,isLoading:false,todo:state.todo.filter((t)=>t._id != action.payload)}
    }
    case TODO_DELETE_ERROR:{
        return {...state,isLoading:false,isError:true}
    }
    case TODO_PATCH_REQUEST:{
        return {...state,isLoading:true,isError:false}
    }
    case TODO_PATCH_SUCCESS:{
        return {...state,isLoading:false,todo:state.todo.map((t)=>{
            if(t._id == action.payload) return {...t,isCompleted:true}
            else return t
        })}
    }
    case TODO_PATCH_ERROR:{
        return {...state,isLoading:false,isError:true}
    }
    default:{
        return state;
    }
   }
}

export default reducer;