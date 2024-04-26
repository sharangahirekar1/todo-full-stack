import { Box, Fab, TextField } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import React, { useEffect, useState } from 'react'
import Skeleton from '@mui/material/Skeleton';
import axios from 'axios';

const GenAi = () => {
    const [prompt, setPrompt] = useState("");
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState("");
    const user = JSON.parse(localStorage.getItem("user"));
    const apiCall = async () => {
        setLoading(true);
        const res = await axios({
            method: "POST",
            url: "http://localhost:8111/genai/text2text?" + "userId=" + user.userId,
            data: {prompt},
            headers: {
                "Content-type": 'application/json'
            }
        })
        return res.data.response;
    }
    const handleSubmit = async ()=> {
        const response = await apiCall();
        setResponse(response);
        setLoading(false);
    }
  return [
    <Box sx={{
        display: {xs: "block",md: "flex"},
        justifyContent:"space-around",
        backgroundColor: 'white',
        paddingTop: "2%",
        paddingBottom: "2%"
    }}>
        <TextField name="title" label="Prompt" sx={{
            width:"140ch"
        }} multiline maxRows={2} value={prompt} onChange={(ev)=>setPrompt(ev.target.value)}/>
        <Fab color="primary" onClick={handleSubmit}  sx={{
            marginTop: {xs: "15px", md: "0px"}
        }}>
            <AddIcon />
        </Fab>
    </Box>,
    <>
    {loading ?
    <Skeleton animation="wave" />
     : 
    <Box>
        {response}
    </Box>}
    </>
  ]
}

export default GenAi