import axios from 'axios';
import {types} from './types';

//---------------------- action creators -----------------------------

const todoRequest = ()=>{
    return {
        type: types.TODO_REQUEST
    }
}

const todoGetSuccess = (dataArray)=>{
    return {
        type: types.TODO_GET_SUCCESS,
        payload:dataArray
    }
}
const todoGetError = (err)=>{
    return {
        type: types.TODO_GET_ERROR,
        payload:err
    }
}

const todoPostSuccess = (data)=>{
    return {
        type: types.TODO_POST_SUCCESS,
        payload:data
    }
}
const todoPostError = (err)=>{
    return {
        type: types.TODO_POST_ERROR,
        payload:err
    }
}

const todoDeleteSuccess = (id)=>{
    return {
        type: types.TODO_DELETE_SUCCESS,
        payload:id
    }
}
const todoDeleteError = (err)=>{
    return {
        type: types.TODO_DELETE_ERROR,
        payload:err
    }
}

const todoPatchSuccess = (id)=>{
    return {
        type: types.TODO_PATCH_SUCCESS,
        payload:id
    }
}
const todoPatchError = (err)=>{
    return {
        type: types.TODO_PATCH_ERROR,
        payload:err
    }
}

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

//---------------------- actual actions ------------------------------

const getData = ()=>(dispatch)=>{
    dispatch(todoRequest());

    return axios({
        method:'GET',
        url:"http://localhost:8111/todos/",
    }).then((res)=>dispatch(todoGetSuccess(res.data))).catch((err)=>dispatch(todoGetError(err)))
}

const postData = (data)=>(dispatch)=>{
    dispatch(todoRequest());

    return axios({
        method:'POST',
        url:"http://localhost:8111/todos",
        data:JSON.stringify(data),
        headers:{
            "Content-Type":"application/json"
        }
    }).then((res)=>dispatch(todoPostSuccess(res.data))).catch((err)=>dispatch(todoPostError(err)))
}

const deleteData = (id)=>(dispatch)=>{
    dispatch(todoRequest());

    try{
        return axios({
            method:'DELETE',
            url:'http://localhost:8111/todos/'+id,
        }).then((res)=>dispatch(todoDeleteSuccess(id))).catch((err)=>dispatch(todoDeleteError(err)))
    }catch(err){console.log(err)}
}

const patchData = (id,body)=>(dispatch)=>{
    dispatch(todoRequest());

    return axios({
        method:'PATCH',
        url:'http://localhost:8111/todos/'+id,
        data:JSON.stringify(body),
        headers:{
            'Content-Type':'application/json'
        }
    }).then((res)=>{dispatch(todoPatchSuccess(id))}).catch((err)=>dispatch(todoPatchError(err)))
}

const ping = () =>{
    return axios({
        method:'GET',
        url:'http://localhost:8111'
    })
}

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


export const actions = {
    getData,
    postData,
    deleteData,
    patchData,
    ping,
    signupApi,
    loginApi,
}





//---------------------- actual actions ------------------------------