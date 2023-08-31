import { Button, TextField } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const Login = ()=>{
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
                <TextField label="Username"/>
                <TextField label="Password"/>
                <Button variant="contained">Login</Button>
                <div style={{
                    textAlign:"center"
                }}>Not a member? <Link to="/signup">Create an account</Link> </div>
            </div>
        </div>
    )
}

export default Login;