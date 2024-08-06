import { Snackbar } from "@mui/material";
import { createContext, useState } from "react";

export const SnackBarContext = createContext();

const SnackBarProvider = ({children}) => {
    const [snackbar, setSnackbar] = useState({
        open: false,
        msg: ""
    })
    const handleCloseSnackbar = (msg) => {
        setSnackbar({open: false, msg: ""})
    }
    return (
        <SnackBarContext.Provider value={{
            snackbar,
            setSnackbar
        }}>
            {children}
            <Snackbar
                anchorOrigin={{ vertical: "bottom", horizontal: 'center' }}
                open={snackbar.open}
                onClose={handleCloseSnackbar}
                message={snackbar.msg}
            />
        </SnackBarContext.Provider>
    )
}

export default SnackBarProvider;