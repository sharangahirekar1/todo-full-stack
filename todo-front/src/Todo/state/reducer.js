import {todoTypes} from './types';

const initState = {
    isLoading:false,
    isError:false,
    todo:[],
}

const todoReducer = (state=initState,action)=>{
    switch(action.type){
        case todoTypes.TODO_REQUEST:{
            return {
                ...state,
                isLoading:true,
                isError:false
            }
        }
        case todoTypes.TODO_GET_SUCCESS:{
            return {
                ...state,
                isLoading:false,
                todo:action.payload
            }
        }
        case todoTypes.TODO_GET_ERROR:{
            return {
                ...state,
                isLoading:false,
                isError:true
            }
        }
        case todoTypes.TODO_POST_SUCCESS:{
            return {
                ...state,
                isLoading:false,
                todo:[...state.todo,action.payload]
            }
        }
        case todoTypes.TODO_POST_ERROR:{
            return {
                ...state,
                isLoading:false,
                isError:true
            }
        }
        case todoTypes.TODO_DELETE_SUCCESS:{
            return {
                ...state,
                isLoading:false,
                todo:state.todo.filter((t)=>t._id !== action.payload)
            }
        }
        case todoTypes.TODO_DELETE_ERROR:{
            return {
                ...state,
                isLoading:false,
                isError:true
            }
        }
        case todoTypes.TODO_PATCH_SUCCESS:{
            return {
                ...state,
                isLoading:false,
                todo:state.todo.map((t)=>{
                    if(t._id === action.payload) return {...t,isCompleted:true}
                    else return t
                })
            }
        }
        case todoTypes.TODO_PATCH_ERROR:{
            return {
                ...state,
                isLoading:false,
                isError:true
            }
        }
        default: return state
    }
}

export { todoReducer };