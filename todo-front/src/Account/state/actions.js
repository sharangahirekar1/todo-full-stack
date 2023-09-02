import axios from 'axios';
import {types} from './types';


const userLoginRequest = ()=>{
    return {
        type: types.USER_LOGIN_REQUEST
    }
}

const userLoginSuccess = (loginData)=>{
    return {
        type: types.USER_LOGIN_SUCCESS,
        payload: loginData
    }
}

const userLoginError = (error)=>{
    return {
        type: types.USER_LOGIN_ERROR,
        payload: error,
    }
}

const userSignupRequest = ()=>{
    return {
        type: types.USER_SIGNUP_REQUEST
    }
}

const userSignupSuccess = (signupData)=>{
    return {
        type: types.USER_SIGNUP_SUCCESS,
        payload: signupData
    }
}

const userSignupError = (error)=>{
    return {
        type: types.USER_SIGNUP_ERROR,
        payload: error
    }
}



//---------------------- action creators -----------------------------



const signupApi = (data)=>(dispatch)=>{
    dispatch(userSignupRequest());

    return axios({
        method:"POST",
        url:"http://localhost:8111/users/signup",
        data: JSON.stringify(data),
        headers:{
            "Content-Type":"application/json"
        }
    }).then((res)=>dispatch(userSignupSuccess(data))).catch((err)=>dispatch(userSignupError(err)))
}

const loginApi = (data)=>(dispatch)=>{
    dispatch(userLoginRequest());

    return axios({
        method:"POST",
        url:"http://localhost:8111/users/login",
        data: JSON.stringify(data),
        headers:{
            "Content-Type":"application/json"
        }
    }).then((res)=>dispatch(userLoginSuccess(data))).catch((err)=>dispatch(userLoginError(err)))
}


export const userActions = {
    signupApi,
    loginApi,
}

