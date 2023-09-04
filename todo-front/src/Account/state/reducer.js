import {userTypes} from './types';

const initState = {
    isLoading:false,
    isError:false,

    login:null,
    signup:null,
}

const userReducer = (state=initState,action)=>{
    switch(action.type){
        case userTypes.USER_LOGIN_REQUEST || userTypes.USER.SIGNUP_REQUEST:{
            return {
                ...state,
                isLoading:true,
                isError:false,
            }
        }
        case userTypes.USER_LOGIN_SUCCESS || userTypes.USER_SIGNUP_SUCCESS:{
            return {
                ...state,
                isLoading:false,
                isError: false,
            }
        }
        case userTypes.USER_LOGIN_ERROR || userTypes.USER_SIGNUP_ERROR:{
            return {
                ...state,
                isLoading:false,
                isError: true
            }
        }
        default: return state
    }
}

export { userReducer };