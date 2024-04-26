import { Box, Fab, TextField } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import React from 'react'

const GenAi = () => {
    const handleChange = ()=> {

    }
    const handleSubmit = ()=> {

    }
  return (
    <Box sx={{
        display: {xs: "block",md: "flex"},
        justifyContent:"space-around",
        backgroundColor: 'white',
        paddingTop: "2%",
        paddingBottom: "2%"
    }}>
        <TextField name="title" label="Prompt" sx={{
            width:"140ch"
        }} multiline maxRows={2} onChange={handleChange}/>
        <Fab color="primary" onClick={handleSubmit}  sx={{
            marginTop: {xs: "15px", md: "0px"}
        }}>
            <AddIcon />
        </Fab>
    </Box>
  )
}

export default GenAi
