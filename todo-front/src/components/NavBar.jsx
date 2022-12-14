import React from 'react';
import AppBar from '@mui/material/AppBar';
import {Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Button, Tooltip, MenuItem} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import AdbIcon from '@mui/icons-material/Adb';
import {useNavigate} from 'react-router-dom';

const pages = ['Todo','Login','Blog'];
const setting = ['Profile','Account','Dashboard','Logout'];

const NavBar = ()=>{
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const navigate = useNavigate();

    const handleOpenNavMenu = (e)=>{
        setAnchorElNav(e.currentTarget);
    }
    const handleOpenUserMenu = (e)=>{
        setAnchorElUser(e.currentTarget);
    }
    const handleCloseNavMenu = ()=>{
        setAnchorElNav(null);
    }
    const handleCloseUserMenu = ()=>{
        setAnchorElUser(null);
    }
    return (
        <div>
            <AppBar>
                <Container>
                    <Toolbar>
                        <AdbIcon sx={{display:{xs:'none',md:'flex'},mr:1}}/>
                        <Typography sx={{
                            mr:2,
                            display:{xs:'none',md:'flex'},
                            fontFamily:'monospace',
                            fontWeight:700,
                            letterSpacing:'.3rem',

                            color:'inherit',
                            textDecoration:'none'
                        }}>
                            TODO
                        </Typography>
                        <Box sx={{
                            flexGrow:1,
                            display:{xs:'flex',md:'none'}
                        }}>
                          <IconButton onClick={handleOpenNavMenu}>
                            <MenuIcon/>
                          </IconButton>
                          <Menu anchorEl={anchorElNav} 
                            open={Boolean(anchorElNav)} 
                            onClose={handleCloseNavMenu}
                            sx={{
                                display:{xs:'block',md:'none'}
                          }}>
                            {pages.map((page)=><MenuItem key={page} onClick={()=>{handleCloseNavMenu();if(page === 'Login')navigate("/login")}}>
                                <Typography>{page}</Typography>
                            </MenuItem>)}
                          </Menu>
                        </Box>
                        <AdbIcon sx={{
                            display:{xs:'flex',md:'none'},
                            mr:1
                        }} />
                        <Typography sx={{
                            mr:2,
                            display:{xs:'flex',md:'none'},
                            flexGrow:1,
                            fontFamily:'monospace',
                            fontWeight:700,
                            letterSpacing:'.3rem',
                            color:'inherit',
                            textDecoration:'none'
                        }} >
                            TODO
                        </Typography>
                        <Box sx={{
                            flexGrow:1,
                            display:{xs:'none',md:'flex'}
                        }} >
                            {pages.map((page)=><Button 
                                key={page}
                                onClick={()=>{
                                    handleCloseNavMenu();
                                    switch(page){
                                        case 'Todo':{
                                            navigate("/");
                                            break;
                                        }
                                        case 'Login':{
                                            navigate("/login");
                                            break;
                                        }
                                        case 'Blog':{
                                            navigate("/blog");
                                            break;
                                        }
                                        default: {}
                                    }
                                }}
                                sx={{
                                    my:2,
                                    color:'white',
                                    display:'block'
                            }} >{page}</Button>)}
                        </Box>

                        <Box sx={{flexGrow:0}} >
                            <Tooltip title="Account ">
                                <IconButton onClick={handleOpenUserMenu}>
                                    <Avatar alt="Name photo pic"/>
                                </IconButton>
                            </Tooltip>
                            <Menu sx={{mt:'45px'}}
                                anchorEl={anchorElUser}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {setting.map((s)=><MenuItem key={s} onClick={handleCloseUserMenu}>
                                    <Typography>{s}</Typography>
                                </MenuItem>)}
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </div>
    )
}

export default NavBar;