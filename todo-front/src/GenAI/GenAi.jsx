import { Box, Fab, Input, TextField } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import React, { useContext, useEffect, useState } from 'react'
import Skeleton from '@mui/material/Skeleton';
import axios from 'axios';
import {marked} from 'marked';
import { SnackBarContext } from '../Common/Contexts/Snackbar';

const GenAi = () => {
    const {snackbar, setSnackbar} = useContext(SnackBarContext);
    const [promptData, setPromptData] = useState({prompt: "", file: null});
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
        return res.data;
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
        if(response.error) {
            setSnackbar({
                open: true,
                msg: response.error
            })
        }
        setResponse(response.response);
        setLoading(false);

        setPromptData({...promptData, prompt: ""});
    }
    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
    });
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
        <input type='file' multiple='multiple' onChange={async (ev)=>{
            const files = ev.target.files;
            console.log(files,'files from Input tag upload');
            const base64Arr = [];
            for(let i = 0; i < files.length; i++){
                const file = files[i];
                const base64 = await toBase64(file);
                base64Arr.push({base64: base64.slice(23), mimeType: file.type})
            }
                

            console.log(base64Arr, 'base64 files and format')
            // const file = files[0];
            // const base64 = await toBase64(file);
            setPromptData({...promptData, files: base64Arr});
        }}/>
    </Box>,
    <>
    {loading ?
    <Skeleton animation="wave" />
     : 
    <Box>
        {response && <div dangerouslySetInnerHTML={{__html:marked.parse(response) }}></div>}
    </Box>}
    </>
  ]
}

export default GenAi
