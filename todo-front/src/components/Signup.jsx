import { Button, TextField } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import validator from 'validator';
import { actions } from '../store/action';
import { useDispatch, useSelector } from 'react-redux';


const Signup = (props)=>{

    const [ signup, setSignup ] = React.useState({
        email:null,
        username:null,
        password:null,
        confirm_password:null
    })
    const dispatch = useDispatch();
    const loading = useSelector((state)=>state.isLoading);

    const handleChange = (ev)=>{
        if(ev.target.name == "email"){
            if(validator.isEmail(ev.target.value)){
                setSignup({...signup,email:ev.target.value})
            }else setSignup({...signup,email:""})
        }
        else if (ev.target.name == "username"){
            if(validator.isAlphanumeric(ev.target.value) && ev.target.value?.length >= 6){
                setSignup({...signup,username:ev.target.value})
            }else setSignup({...signup,username:""})
        }
        else if(ev.target.name == "password"){
            if(ev.target.value.length > 10){
                setSignup({...signup,password:ev.target.value})
            }else setSignup({...signup,password:""})
        }
        else{
            if(ev.target.value.length > 10){
                setSignup({...signup,confirm_password:ev.target.value})
            }else setSignup({...signup,confirm_password:""})
        }
    }
    const handleSignup = (ev)=>{
        dispatch(actions.signupApi(signup))
    }
    return (
        <div>
            {loading ? <span className='loader'></span>:
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
                }}>SIGNUP</div>
                <TextField label="Email" error={signup.email == ""} name="email" onChange={handleChange}/>
                <TextField label="Username" error={signup.username == ""} name="username" onChange={handleChange}/>
                <TextField label="Password" error={signup.password == ""} name="password" onChange={handleChange}/>
                <TextField label="Confirm Password" error={signup.confirm_password == ""} name="confirm_password" onChange={handleChange}/>
                <Button variant="contained" onClick={handleSignup} disabled={signup.email == "" || signup.username == "" || signup.password == "" || signup.confirm_password == "" || signup.password != signup.confirm_password ? true:false}>Create an account</Button>
                <div style={{
                    textAlign:"center"
                }}>Already a member? <Link to="/login">Go to Login</Link> </div>
            </div>}
        </div>
    )
}

export default Signup;