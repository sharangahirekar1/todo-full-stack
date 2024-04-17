import { Button, TextField } from '@mui/material';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import validator from 'validator';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../state/actions';
import "./../../styles/loader.css"

const Login = ()=>{

    const [ login, setLogin ] = React.useState({
        email:null,
        password:null
    })
    const navigate = useNavigate();
    const loading = useSelector((state)=>state.user.isLoading);
    const dispatch = useDispatch()
    const res = useSelector((state)=>state.user.login);
    console.log(res,' login use selector data');

    const handleChange = (ev)=>{
        if (ev.target.name == "email"){
            setLogin({...login,email:ev.target.value})
        }
        else if(ev.target.name == "password"){
            setLogin({...login,password:ev.target.value})
        }
    }
    const handleLogin = ()=>{
        dispatch(userActions.loginApi(login));
    }
    React.useEffect(()=>{
        if(res && typeof res === "object" && res.username){
            localStorage.setItem("username", res.username);
            navigate("/");
        }
    },[res])
    return (
        <div style={{
        }}>
            {loading ? 
                <span className='loader'></span> 
                : 
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
                <TextField type='email' label="Email" error={login.email == ""} name="email" onChange={handleChange}/>
                <TextField type='password' label="Password" error={login.password == ""} name="password" onChange={handleChange}/>
                <Button variant="contained" onClick={handleLogin} >Login</Button>
                <div style={{
                    textAlign:"center"
                }}>Not a member? <Link to="/signup">Create an account</Link> </div>
            </div>}
        </div>
    )
}

export default Login;