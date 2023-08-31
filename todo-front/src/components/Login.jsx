import { Button, TextField } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import validator from 'validator';

const Login = ()=>{

    const [ login, setLogin ] = React.useState({
        username:null,
        password:null
    })

    const handleChange = (ev)=>{
        if (ev.target.name == "username"){
            if(validator.isAlphanumeric(ev.target.value) && ev.target.value?.length >= 6){
                setLogin({...login,username:ev.target.value})
            }else setLogin({...login,username:""})
        }
        else if(ev.target.name == "password"){
            if(ev.target.value.length > 10){
                setLogin({...login,password:ev.target.value})
            }else setLogin({...login,password:""})
        }
    }
    return (
        <div style={{
        }}>
            <div style={{
                width:"450px",
                height:"400px",
                margin:"auto",
                marginTop:"60px",
                background:"white",
                display:"flex",
                flexDirection:"column",
                gap:"40px",
                padding:"10px",
                borderRadius:"10px"
            }}>
                <div style={{
                    textAlign:"center"
                }}>LOGIN</div>
                <TextField label="Username" error={login.username == ""} name="username" onChange={handleChange}/>
                <TextField label="Password" error={login.password == ""} name="password" onChange={handleChange}/>
                <Button variant="contained" disabled={login.username == "" || login.password == "" ? true:false}>Login</Button>
                <div style={{
                    textAlign:"center"
                }}>Not a member? <Link to="/signup">Create an account</Link> </div>
            </div>
        </div>
    )
}

export default Login;