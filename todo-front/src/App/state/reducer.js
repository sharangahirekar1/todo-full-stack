import {types} from './types';

const initState = {
    isLoading:false,
    isError:false,

    login:null,
    signup:null,
}

const userReducer = (state=initState,action)=>{
    switch(action.type){
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

export default userReducer;