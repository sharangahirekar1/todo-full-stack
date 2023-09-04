import axios from "axios";

const ping = () =>{
    return axios({
        method:'GET',
        url:'http://localhost:8111'
    })
}