import axios from 'axios';
import {userTypes} from './types';

const url = "http://localhost:8111"
// const url = "https://todo-full-stack-0wlj.onrender.com"

const userLoginRequest = ()=>{
    return {
        type: userTypes.USER_LOGIN_REQUEST
    }
}

const userLoginSuccess = (loginData)=>{
    return {
        type: userTypes.USER_LOGIN_SUCCESS,
        payload: loginData.data
    }
}

const userLoginError = (error)=>{
    return {
        type: userTypes.USER_LOGIN_ERROR,
        payload: error,
    }
}

const userSignupRequest = ()=>{
    return {
        type: userTypes.USER_SIGNUP_REQUEST
    }
}

const userSignupSuccess = (signupData)=>{
    return {
        type: userTypes.USER_SIGNUP_SUCCESS,
        payload: signupData.data
    }
}

const userSignupError = (error)=>{
    return {
        type: userTypes.USER_SIGNUP_ERROR,
        payload: error
    }
}




//---------------------- action creators -----------------------------



const signupApi = (data)=>(dispatch)=>{
    dispatch(userSignupRequest());

    return axios({
        method:"POST",
        url:url + "/users/signup",
        data: JSON.stringify(data),
        headers:{
            "Content-Type":"application/json"
        }
    }).then((res)=>{
        dispatch(userSignupSuccess(res));
    }).catch((err)=>dispatch(userSignupError(err)))
}

const loginApi = (data)=>(dispatch)=>{
    dispatch(userLoginRequest());

    return axios({
        method:"POST",
        url:url + "/users/login",
        data: JSON.stringify(data),
        headers:{
            "Content-Type":"application/json",
            "Cookie":document.cookie
        }
    }).then((res)=>dispatch(userLoginSuccess(res))).catch((err)=>dispatch(userLoginError(err)))
}



export const userActions = {
    signupApi,
    loginApi,
    userSignupSuccess,
}

