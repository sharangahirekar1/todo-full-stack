import axios from 'axios';
import {todoTypes} from './types';

const url = "http://localhost:8111"
// const url = "https://todo-full-stack-0wlj.onrender.com"

//---------------------- action creators -----------------------------

const todoRequest = ()=>{
    return {
        type: todoTypes.TODO_REQUEST
    }
}

const todoGetSuccess = (dataArray)=>{
    return {
        type: todoTypes.TODO_GET_SUCCESS,
        payload:dataArray
    }
}
const todoGetError = (err)=>{
    return {
        type: todoTypes.TODO_GET_ERROR,
        payload:err
    }
}

const todoPostSuccess = (data)=>{
    return {
        type: todoTypes.TODO_POST_SUCCESS,
        payload:data
    }
}
const todoPostError = (err)=>{
    return {
        type: todoTypes.TODO_POST_ERROR,
        payload:err
    }
}

const todoDeleteSuccess = (id)=>{
    return {
        type: todoTypes.TODO_DELETE_SUCCESS,
        payload:id
    }
}
const todoDeleteError = (err)=>{
    return {
        type: todoTypes.TODO_DELETE_ERROR,
        payload:err
    }
}

const todoPatchSuccess = (id)=>{
    return {
        type: todoTypes.TODO_PATCH_SUCCESS,
        payload:id
    }
}
const todoPatchError = (err)=>{
    return {
        type: todoTypes.TODO_PATCH_ERROR,
        payload:err
    }
}

//---------------------- actual actions ------------------------------

const getData = (userId)=>(dispatch)=>{
    dispatch(todoRequest());

    return axios({
        method:'GET',
        url:url + "/todos?userId="+ userId,
    }).then((res)=>dispatch(todoGetSuccess(res.data))).catch((err)=>dispatch(todoGetError(err)))
}

const postData = (data)=>(dispatch)=>{
    dispatch(todoRequest());

    return axios({
        method:'POST',
        url:url + "/todos",
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
            url:url + '/todos/'+id,
        }).then((res)=>dispatch(todoDeleteSuccess(id))).catch((err)=>dispatch(todoDeleteError(err)))
    }catch(err){console.log(err)}
}

const patchData = (id,body)=>(dispatch)=>{
    dispatch(todoRequest());

    return axios({
        method:'PATCH',
        url:url + '/todos/'+id,
        data:JSON.stringify(body),
        headers:{
            'Content-Type':'application/json'
        }
    }).then((res)=>{dispatch(todoPatchSuccess(id))}).catch((err)=>dispatch(todoPatchError(err)))
}

export const todosActions = {
    getData,
    postData,
    deleteData,
    patchData,
}