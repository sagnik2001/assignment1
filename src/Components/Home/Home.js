import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useAuth } from '../../AuthContext/AuthContext';
import {Link} from "react-router-dom"
const Home = () => {
    const {logout}=useAuth()
    return (
        <Box sx={{ flexGrow: 1 }} >
        <AppBar position="static" style={{backgroundColor:"green"}}>
          <Toolbar>
           
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Home Page
            </Typography>
            <Link to="/">
            <Button color="inherit" onClick={async (e) => {
              e.preventDefault()
              console.log('LogOut');
              await logout()
            }}>Logout</Button>
            </Link>
          </Toolbar>
        </AppBar>
        </Box>
    )
}

export default Home
