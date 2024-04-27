import { Box, Fab, Input, TextField } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import React, { useContext, useEffect, useState } from 'react'
import Skeleton from '@mui/material/Skeleton';
import axios from 'axios';
import {marked} from 'marked';
import { SnackBarContext } from '../Common/Contexts/Snackbar';

const GenAi = () => {
    const {snackbar, setSnackbar} = useContext(SnackBarContext);
    const [promptData, setPromptData] = useState({prompt: "", files: null});
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState("");
    const user = JSON.parse(localStorage.getItem("user"));
    const apiCall = async () => {
        setLoading(true);
        const res = await axios({
            method: "POST",
            url: "http://localhost:8111/genai/text2text?" + "userId=" + user.userId,
            data: promptData,
            headers: {
                "Content-type": 'application/json'
            }
        })
        return res.data.response;
    }
    const handleSubmit = async ()=> {
        if(promptData.prompt === "") {
            setSnackbar({
                open: true,
                msg: "Cannot fetch for empty prompt!"
            })
            return
        }
        const response = await apiCall();
        setResponse(response);
        setLoading(false);
        setPromptData({...promptData, prompt: ""});
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
        }} multiline maxRows={2} value={promptData.prompt} onChange={(ev)=>setPromptData({...promptData, prompt: ev.target.value})}/>
        <Fab color="primary" onClick={handleSubmit}  sx={{
            marginTop: {xs: "15px", md: "0px"}
        }}>
            <AddIcon />
        </Fab>
        <Input type='file' onChange={(ev)=>{
            const files = ev.target.files;
            console.log(files,'files from Input tag upload');
            setPromptData({...promptData, files});
        }}/>
    </Box>,
    <>
    {loading ?
    <Skeleton animation="wave" />
     : 
    <Box>
        {response !== "" && marked.parse(response)}
    </Box>}
    </>
  ]
}

export default GenAi
