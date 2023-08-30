import axios from 'axios';
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

//---------------------- action creators -----------------------------

export const todoRequest = ()=>{
    return {
        type: TODO_REQUEST
    }
}

export const todoGetSuccess = (dataArray)=>{
    return {
        type: TODO_GET_SUCCESS,
        payload:dataArray
    }
}
export const todoGetError = (err)=>{
    return {
        type: TODO_GET_ERROR,
        payload:err
    }
}

export const todoPostSuccess = (data)=>{
    return {
        type: TODO_POST_SUCCESS,
        payload:data
    }
}
export const todoPostError = (err)=>{
    return {
        type: TODO_POST_ERROR,
        payload:err
    }
}

export const todoDeleteSuccess = (id)=>{
    return {
        type: TODO_DELETE_SUCCESS,
        payload:id
    }
}
export const todoDeleteError = (err)=>{
    return {
        type: TODO_DELETE_ERROR,
        payload:err
    }
}

export const todoPatchSuccess = (id)=>{
    return {
        type: TODO_PATCH_SUCCESS,
        payload:id
    }
}
export const todoPatchError = (err)=>{
    return {
        type: TODO_PATCH_ERROR,
        payload:err
    }
}



//---------------------- action creators -----------------------------

//---------------------- actual actions ------------------------------

export const getData = ()=>(dispatch)=>{
    dispatch(todoRequest());

    return axios({
        method:'GET',
        url:"http://localhost:8111/todos/",
    }).then((res)=>dispatch(todoGetSuccess(res.data))).catch((err)=>dispatch(todoGetError(err)))
}

export const postData = (data)=>(dispatch)=>{
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

export const deleteData = (id)=>(dispatch)=>{
    dispatch(todoRequest());

    try{
        return axios({
            method:'DELETE',
            url:'http://localhost:8111/todos/'+id,
        }).then((res)=>dispatch(todoDeleteSuccess(id))).catch((err)=>dispatch(todoDeleteError(err)))
    }catch(err){console.log(err)}
}

export const patchData = (id,body)=>(dispatch)=>{
    dispatch(todoRequest());

    return axios({
        method:'PATCH',
        url:'http://localhost:8111/todos/'+id,
        data:JSON.stringify(body),
        headers:{
            'Content-Type':'application/json'
        }
    }).then((res)=>{console.log(res,'from patchdata');dispatch(todoPatchSuccess(id))}).catch((err)=>dispatch(todoPatchError(err)))
}

export const ping = () =>{
    return axios({
        method:'GET',
        url:'http://localhost:8111'
    })
}





//---------------------- actual actions ------------------------------