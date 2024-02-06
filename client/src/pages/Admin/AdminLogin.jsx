import { Box, Button, Card, Link, Paper, TextField, Typography } from "@mui/material"
import { useState } from "react"
import { BASE_URL } from "../../config"
import axios from 'axios'
import { useNavigate } from "react-router-dom"

export const AdminLogin = () => {

    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const navigate = useNavigate()

    const handleLogin = async() => {
        try{
            const response = await axios.post(`${BASE_URL}/admin/login`,{
                username,
                password
            }) 
            localStorage.setItem("adminToken",`Bearer ${response.data.token}`)
            navigate('/admin-dashboard')
        }catch(err){
            console.error(err)
        }
    }

    return <Box sx={{display:"flex",
    flexDirection: 'column',
    // justifyContent : 'center',
    alignItems : 'center',
    backgroundColor: '#e3e6e6',
    height: '100vh'
        }}>
        <Card sx={{m: '1rem'}}>
        <Paper elevation={5}>
        <Box sx={{p : '3rem' , pt: '0rem',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column'
        }}>

        <img src="fullstop_orange.png" style={{width:'15rem'}}/>
        <Typography sx={{fontSize : '3rem'}}>
                Admin Login
        </Typography>
        <Box>
            <TextField label='username'
                        variant="outlined"
                        type = 'text'
                        color="secondary"
                        onChange={(e)=>setUsername(e.target.value)}
                        sx={{m: '1rem'}}
            >
            </TextField>
        </Box>
        <Box>
            <TextField
                label='password'
                variant="outlined"
                type='password'
                color="secondary"
                onChange={(e)=>setPassword(e.target.value)}
            ></TextField>
        </Box>
        <Box>
            <Button variant="contained"
                    onClick={handleLogin}
                    sx={{m: '1rem'}}
            >
                Sign In
            </Button>
        </Box>
        </Box>
        </Paper>
        </Card>
        </Box>
        }