import {userTypes} from './types';

const initState = {
    isLoading:false,
    isError:false,
    response: null,
    login:null,
    signup:null,
}

const userReducer = (state=initState,action)=>{
    switch(action.type){
        case userTypes.USER_SIGNUP_REQUEST:{
            return {
                ...state,
                isLoading:true,
                isError:false,
            }
        }
        case userTypes.USER_SIGNUP_SUCCESS:{
            return {
                ...state,
                response: action.payload,
                isLoading:false,
                isError: false,
            }
        }
        case userTypes.USER_SIGNUP_ERROR:{
            return {
                ...state,
                isLoading:false,
                isError: true
            }
        }
        case userTypes.USER_LOGIN_REQUEST: {
            return {
                ...state,
                isLoading: true,
                isError: false
            }
        }
        case userTypes.USER_LOGIN_SUCCESS: {
            return {
                ...state,
                login: action.payload,
                isLoading: false,
                isError: false
            }
        }
        case userTypes.USER_LOGIN_ERROR: {
            return {
                ...state,
                isLoading: false,
                isError: true
            }
        }
        case userTypes.USER_LOGOUT: {
            return {
                ...state,
                login: null
            }
        }
        default: return state
    }
}

export { userReducer };