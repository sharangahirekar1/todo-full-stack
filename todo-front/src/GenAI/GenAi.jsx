import { Box, Fab, Input, TextField } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import React, { useContext, useEffect, useState } from 'react'
import Skeleton from '@mui/material/Skeleton';
import axios from 'axios';
import {marked} from 'marked';
import { SnackBarContext } from '../Common/Contexts/Snackbar';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

// const url = "http://localhost:8111";
const url = "https://todo-full-stack-0wlj.onrender.com";


const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

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
            url: url + "/genai/text2text",
            data: promptData,
            headers: {
                "Content-type": 'application/json',
                "authorization": `Bearer ${user.token}`
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
    const uploadFileFunc = async (ev)=>{
        const files = ev.target.files;
        const base64Arr = [];
        for(let i = 0; i < files.length; i++){
            const file = files[i];
            const base64 = await toBase64(file);
            base64Arr.push({base64: base64.slice(23), mimeType: file.type})
        }
        setPromptData({...promptData, files: base64Arr});
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
        <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
            >
            Upload files
            <VisuallyHiddenInput
                type="file"
                onChange={uploadFileFunc}
                multiple
            />
        </Button>
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
