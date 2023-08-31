import { Button, TextField } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';


const Signup = (props)=>{
    return (
        <div>
            <div style={{
                width:"450px",
                height:"400px",
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
                }}>SIGNUP</div>
                <TextField label="Email"/>
                <TextField label="Username"/>
                <TextField label="Password"/>
                <TextField label="Confirm Password"/>
                <Button variant="contained">Create an account</Button>
                <div style={{
                    textAlign:"center"
                }}>Already a member? <Link to="/login">Go to Login</Link> </div>
            </div>
        </div>
    )
}

export default Signup;