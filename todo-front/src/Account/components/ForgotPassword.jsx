import { Button, TextField } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ForgotPassword = () => {
    const [forgotP, setForgotP] = useState({
        email: null,
        password: null,
        username: null
    })
    const navigate = useNavigate();
    const [response, setResponse] = useState({})
    const handleChange = (ev) => {
        if(ev.key === "Enter") {
            setTimeout(()=>{
                handleSubmit();
            },100)
        }
        if(ev.target.name == "email"){
                setForgotP({...forgotP,email:ev.target.value})
        }
        else if (ev.target.name == "username"){
                setForgotP({...forgotP,username:ev.target.value})
        }
        else if(ev.target.name == "password"){
                setForgotP({...forgotP,password:ev.target.value})
        }
    }
    const handleSubmit = () => {
        axios({
            method: "POST",
            url: "http://localhost:8111/users/forgotpassword",
            data: forgotP,
            headers: {
                "Content-type": "application/json"
            }
        }).then((res)=>setResponse(res.data))
    }
    React.useEffect(()=>{
        if(response && response.message === "Successfully updated the password"){
            navigate("/login")
        }
    },[response])
    return (
        <div>
            {false ? <span className='loader'></span>:
            <div style={{
                width:"450px",
                height:"410px",
                margin:"auto",
                marginTop:"60px",
                background:"white",
                display:"flex",
                flexDirection:"column",
                gap:"18px",
                padding:"10px",
                borderRadius:"10px"
            }}>
                <div style={{
                    textAlign:"center"
                }}>FORGOT PASSWORD</div>
                <TextField label="Email" error={forgotP.email == ""} name="email" onKeyUpCapture={handleChange}/>
                <TextField label="Username" error={forgotP.username == ""} name="username" onKeyUpCapture={handleChange}/>
                <TextField label="Password" error={forgotP.password == ""} name="password" onKeyUpCapture={handleChange}/>
                <Button variant="contained" onClick={handleSubmit} >Update Password</Button>
                
            </div>}

        </div>
        )
}

export default ForgotPassword;
