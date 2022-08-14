import { TODO_DELETE_ERROR, TODO_DELETE_REQUEST, TODO_DELETE_SUCCESS, TODO_GET_ERROR, TODO_GET_REQUEST, TODO_GET_SUCCESS, TODO_PATCH_ERROR, TODO_PATCH_REQUEST, TODO_PATCH_SUCCESS, TODO_POST_ERROR, TODO_POST_REQUEST, TODO_POST_SUCCESS } from "./types"
import axios from 'axios';

//----------------------action creators-----------------------
export const todoGetRequest = ()=>{
    return {
        type:TODO_GET_REQUEST
    }
}
export const todoGetSuccess = (arrdata)=>{
    return {
        type:TODO_GET_SUCCESS,
        payload:arrdata
    }
}
export const todoGetError = (err)=>{
    return {
        type:TODO_GET_ERROR,
        payload:err
    }
}

export const todoPostRequest = ()=>{
    return {
        type:TODO_POST_REQUEST
    }
}
export const todoPostSuccess = (newData)=>{
    return {
        type:TODO_POST_SUCCESS,
        payload:newData
    }
}
export const todoPostError = (err)=>{
    return {
        type:TODO_POST_ERROR,
        payload:err
    }
}

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
export const todoDeleteError = (err)=>{
    return {
        type:TODO_DELETE_ERROR,
        payload:err
    }
}

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
export const todoPatchError = (err)=>{
    return{
        type:TODO_PATCH_ERROR,
        payload:err
    }
}

//----------------------action creators-----------------------





//----------------------actual actions------------------------

export const getData = ()=>(dispatch)=>{
    dispatch(todoGetRequest());

    return axios({
        method:"GET",
        url:"http://localhost:8000/todos"
    }).then((res)=>{dispatch(todoGetSuccess(res.data));console.log("getData-->",res.data)}).catch((err)=>dispatch(todoGetError(err)))

}

export const postData = (data)=>(dispatch)=>{
    dispatch(todoPostRequest());

    return axios({
        method:"POST",
        url:"http://localhost:8000/todos",
        data:JSON.stringify(data),
        headers:{
            "Content-Type": "application/json"
        }
    }).then((res)=>dispatch(todoPostSuccess(data))).catch((err)=>dispatch(todoPostError(err)));
}

export const deleteData =  (id)=>(dispatch)=>{
    dispatch(todoDeleteRequest());

    try{
        return axios({
            method:"DELETE",
            url:"http://localhost:8000/todos/"+ id,
        }).then((res)=>{dispatch(todoDeleteSuccess(id));console.log("delete request");}).catch((err)=>dispatch(todoDeleteError(err)))
    }catch(err){console.log(err,"errorr")}
}

export const patchData = (id,data)=>(dispatch)=>{
    dispatch(todoPatchRequest());

    return axios({
        method:"PATCH",
        url:"http://localhost:8000/todos/"+id,
        headers:{
            "Content-Type": "application/json"
        },
        data:JSON.stringify(data)
    }).then((res)=>dispatch(todoPatchSuccess(id))).catch((err)=>dispatch(todoPatchError(err)))
}

//----------------------actual actions------------------------