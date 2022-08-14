import axios from 'axios';
import {TODO_GET_REQUEST} from './types';
import {TODO_GET_SUCCESS} from './types';
import {TODO_GET_ERROR} from './types';
import {TODO_POST_REQUEST} from './types';
import {TODO_POST_SUCCESS} from './types';
import {TODO_POST_ERROR} from './types';
import {TODO_DELETE_REQUEST} from './types';
import {TODO_DELETE_SUCCESS} from './types';
import {TODO_DELETE_ERROR} from './types';
import {TODO_PATCH_REQUEST} from './types';
import {TODO_PATCH_SUCCESS} from './types';
import {TODO_PATCH_ERROR} from './types';

//-----------action creators------------
//GET
export const todoGetRequest = ()=>{
    return {
        type:TODO_GET_REQUEST
    }
}

export const todoGetSuccess = (data)=>{
    return {
        type:TODO_GET_SUCCESS,
        payload:data
    }
}

export const todoGetError = (error)=>{
    return {
        type:TODO_GET_ERROR,
        payload:error
    }
}

//POST
export const todoPostRequest = ()=>{
    return {
        type:TODO_POST_REQUEST
    }
}

export const todoPostSuccess = (data)=>{
    return {
        type:TODO_POST_SUCCESS,
        payload: data
    }
}

export const todoPostError = (error)=>{
    return {
        type:TODO_POST_ERROR,
        payload: error
    }
}
//DELETE
export const todoDeleteRequest = ()=>{
    return {
        type:TODO_DELETE_REQUEST
    }
}

export const todoDeleteSuccess = (id)=>{
    return {
        type:TODO_DELETE_SUCCESS,
        payload:id
    }
}
export const todoDeleteError = (error)=>{
    return {
        type:TODO_DELETE_ERROR,
        payload:error
    }
}
//PATCH
export const todoPatchRequest = ()=>{
    return {
        type:TODO_PATCH_REQUEST
    }
}
export const todoPatchSuccess = (id)=>{
    return {
        type:TODO_PATCH_SUCCESS,
        payload:id
    }
}
export const todoPatchError = (error)=>{
    return {
        type:TODO_PATCH_ERROR,
        payload: error
    }
}
//-----------action creators------------


//-----------actual actions-------------
export const getData = (dispatch)=>{
    dispatch(todoGetRequest());
    
    axios({
        method:"GET",
        url:"http://localhost:8000/blogs"
    })
    .then((res)=>dispatch(todoGetSuccess(res.data)))
    .catch((err)=>dispatch(todoGetError(err.message)))

}

export const postData = (data,dispatch)=>{
    dispatch(todoPostRequest());

    axios({
        method:"POST",
        url:"http://localhost:8000/blogs",
        data:JSON.stringify(data),
        headers:{
            "Content-Type": "application/json"
        }
    }).then((res)=>dispatch(todoPostSuccess(res.data))).catch((err)=>dispatch(todoPostError()))
}

export const patchData = (data,id,dispatch)=>{
    dispatch(todoPatchRequest());

    axios({
        method:"PATCH",
        url:"http://localhost:8000/blogs/"+id,
        data:JSON.stringify(data),
        headers:{
            "Content-Type":"application/json"
        }
    }).then((res)=>dispatch(todoPatchSuccess(id))).catch((err)=>dispatch(todoPatchError(err.message)))
}

export const deleteData = (_id,dispatch)=>{
    dispatch(todoDeleteRequest());

    axios({
        method:"DELETE",
        url:"http://localhost:8000/blogs/"+_id,
    }).then((res)=>dispatch(todoDeleteSuccess(_id))).catch((err)=>dispatch(todoDeleteError(err)))
}


//-----------actual actions-------------