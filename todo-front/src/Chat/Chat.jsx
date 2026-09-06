import React, { useEffect, useRef, useState } from 'react';
import TextField from '@mui/material/TextField';
import { CircularProgress, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';
import axios from 'axios';
import './Chat.css';

// const url = "http://localhost:8111";
const url = "https://todo-full-stack-0wlj.onrender.com";

const Chat = () => {
    const [chats, setChats] = useState([]);
    const [query, setQuery] = useState("");
    const [isSending, setIsSending] = useState(false);
    const [error, setError] = useState("");
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chats, isSending]);

    const handleChange = (e) => {
        setQuery(e.target.value);
    };

    const handleSubmit = async (event) => {
        event?.preventDefault();
        if (!query.trim() || isSending) return;

        const user = JSON.parse(localStorage.getItem("user"));
        setIsSending(true);
        setError("");

        try {
            const response = await axios({
                method: "POST",
                url: url + "/chat/chat",
                data: { query: query.trim() },
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${user.token}`
                }
            });
            setChats(response.data);
            setQuery("");
        } catch (requestError) {
            setError("I couldn't send that message. Please try again.");
        } finally {
            setIsSending(false);
        }
    };

    const messages = chats.data || [];

    return (
        <section className="chat-page">
            <div className="chat-shell">
                <header className="chat-header">
                    <div className="chat-avatar" aria-hidden="true"><SmartToyOutlinedIcon /></div>
                    <div>
                        <p className="chat-eyebrow">Workspace assistant</p>
                        <h1>Chat</h1>
                    </div>
                    <span className="chat-status"><span /> Online</span>
                </header>

                <div className="chat-messages" aria-live="polite">
                    {messages.length === 0 && !isSending ? (
                        <div className="chat-empty-state">
                            <div className="chat-empty-icon"><SmartToyOutlinedIcon /></div>
                            <h2>What can I help with?</h2>
                            <p>Ask a question, brainstorm an idea, or get help planning your next task.</p>
                        </div>
                    ) : messages.map((chat, index) => (
                        <div className={`chat-message-row ${chat.role === "user" ? "is-user" : "is-assistant"}`} key={`${chat.role}-${index}`}>
                            {chat.role !== "user" && <div className="message-avatar"><SmartToyOutlinedIcon /></div>}
                            <div className="chat-message">
                                <span className="message-label">{chat.role === "user" ? "You" : "Assistant"}</span>
                                <p>{chat.content}</p>
                            </div>
                        </div>
                    ))}
                    {isSending && <div className="chat-message-row is-assistant"><div className="message-avatar"><SmartToyOutlinedIcon /></div><div className="chat-message typing-message"><span className="message-label">Assistant</span><CircularProgress size={15} /></div></div>}
                    <div ref={messagesEndRef} />
                </div>

                <form className="chat-composer" onSubmit={handleSubmit}>
                    <TextField
                        className="chat-input"
                        aria-label="Message assistant"
                        placeholder="Write a message..."
                        multiline
                        maxRows={4}
                        onChange={handleChange}
                        onKeyDown={(event) => {
                            if (event.key === 'Enter' && !event.shiftKey) handleSubmit(event);
                        }}
                        value={query}
                        disabled={isSending}
                    />
                    <IconButton className="send-button" type="submit" aria-label="Send message" disabled={!query.trim() || isSending}>
                        {isSending ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
                    </IconButton>
                    <span className="composer-hint">Enter to send · Shift + Enter for a new line</span>
                </form>
                {error && <p className="chat-error" role="alert">{error}</p>}
            </div>
        </section>
    );
};

export default Chat
