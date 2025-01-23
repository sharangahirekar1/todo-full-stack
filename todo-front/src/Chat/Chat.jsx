import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Fab } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';

// const url = "http://localhost:8111";
const url = "https://todo-full-stack-0wlj.onrender.com";

const Chat = () => {
    const [chats, setChats] = useState([]);
    const [query, setQuery] = useState("")
    const handleChange = (e) => {
        setQuery(e.target.value);
    }
    const handleSubmit =  async() => {
        const user = JSON.parse(localStorage.getItem("user"));
        const response = await axios({
            method: "POST",
            url: url + "/chat/chat",
            data: {query},
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${user.token}`
            }
        })
        setChats(response.data);
        setQuery("");
    }
    console.log(chats, 'chats ')
  return (
    <div style={{
        position: "relative"
    }}>
      <div style={{
        height: "75vh",
        overflowY: "scroll"
      }}>
        {/* chat container */}
        {chats.data?.map((chat)=>(
            <div style={{
                display: "flex",
                flexDirection: chat.role == "user" ? "row-reverse" : "row",
                marginTop: 10,
                backgroundColor: chat.role == "user" ? "#5cff00": "white",
                borderRadius: 5,
            }}>
                <div>{chat.content}</div>
                <div style={{
                    width:1,
                    height:1
                }}></div>
            </div>
        ))}
      </div>
      <div>
        {/* chat input */}
        <div style={{
            // position: 'absolute',
            // bottom: 0,
            // left: 0
            display: "flex",
            justifyContent: "space-between"
        }}>
            <TextField
                id="filled-multiline-flexible"
                label="Chat with AI"
                multiline
                maxRows={4}
                variant="filled"
                fullWidth
                onChange={handleChange}
                value={query}
            />
            <Fab color="primary" onClick={handleSubmit} sx={{
                marginTop: {xs: "15px", md: "0px"}
            }}>
                <SendIcon />
            </Fab>
        </div>
      </div>
    </div>
  )
}

export default Chat
