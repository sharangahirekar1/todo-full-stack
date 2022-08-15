import {TODO_REQUEST,
    TODO_GET_SUCCESS,
    TODO_GET_ERROR,
    TODO_POST_SUCCESS,
    TODO_POST_ERROR,
    TODO_DELETE_SUCCESS,
    TODO_DELETE_ERROR,
    TODO_PATCH_SUCCESS,
    TODO_PATCH_ERROR
        } from './types';

const initState = {
    isLoading:false,
    isError:false,
    todo:[]
}

const reducer = (state=initState,action)=>{
    switch(action.type){
        case TODO_REQUEST:{
            return {
                ...state,
                isLoading:true,
                isError:false
            }
        }
        case TODO_GET_SUCCESS:{
            return {
                ...state,
                isLoading:false,
                todo:action.payload
            }
        }
        case TODO_GET_ERROR:{
            return {
                ...state,
                isLoading:false,
                isError:true
            }
        }
        case TODO_POST_SUCCESS:{
            return {
                ...state,
                isLoading:false,
                todo:[...state.todo,action.payload]
            }
        }
        case TODO_POST_ERROR:{
            return {
                ...state,
                isLoading:false,
                isError:true
            }
        }
        case TODO_DELETE_SUCCESS:{
            return {
                ...state,
                isLoading:false,
                todo:state.todo.filter((t)=>t._id !== action.payload)
            }
        }
        case TODO_DELETE_ERROR:{
            return {
                ...state,
                isLoading:false,
                isError:true
            }
        }
        case TODO_PATCH_SUCCESS:{
            return {
                ...state,
                isLoading:false,
                todo:state.todo.map((t)=>{
                    if(t._id === action.payload) return {...t,isCompleted:true}
                    else return t
                })
            }
        }
        case TODO_PATCH_ERROR:{
            return {
                ...state,
                isLoading:false,
                isError:true
            }
        }
        default: return state
    }
}

export default reducer;