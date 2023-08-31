import {types} from './types';

const initState = {
    isLoading:false,
    isError:false,
    todo:[],

    login:null,
    signup:null,
}

const reducer = (state=initState,action)=>{
    switch(action.type){
        case types.TODO_REQUEST:{
            return {
                ...state,
                isLoading:true,
                isError:false
            }
        }
        case types.TODO_GET_SUCCESS:{
            return {
                ...state,
                isLoading:false,
                todo:action.payload
            }
        }
        case types.TODO_GET_ERROR:{
            return {
                ...state,
                isLoading:false,
                isError:true
            }
        }
        case types.TODO_POST_SUCCESS:{
            return {
                ...state,
                isLoading:false,
                todo:[...state.todo,action.payload]
            }
        }
        case types.TODO_POST_ERROR:{
            return {
                ...state,
                isLoading:false,
                isError:true
            }
        }
        case types.TODO_DELETE_SUCCESS:{
            return {
                ...state,
                isLoading:false,
                todo:state.todo.filter((t)=>t._id !== action.payload)
            }
        }
        case types.TODO_DELETE_ERROR:{
            return {
                ...state,
                isLoading:false,
                isError:true
            }
        }
        case types.TODO_PATCH_SUCCESS:{
            return {
                ...state,
                isLoading:false,
                todo:state.todo.map((t)=>{
                    if(t._id === action.payload) return {...t,isCompleted:true}
                    else return t
                })
            }
        }
        case types.TODO_PATCH_ERROR:{
            return {
                ...state,
                isLoading:false,
                isError:true
            }
        }
        case types.USER_LOGIN_REQUEST || types.USER.SIGNUP_REQUEST:{
            return {
                ...state,
                isLoading:true,
                isError:false,
            }
        }
        case types.USER_LOGIN_SUCCESS || types.USER_SIGNUP_SUCCESS:{
            return {
                ...state,
                isLoading:false,
                isError: false,
            }
        }
        case types.USER_LOGIN_ERROR || types.USER_SIGNUP_ERROR:{
            return {
                ...state,
                isLoading:false,
                isError: true
            }
        }
        default: return state
    }
}

export default reducer;