import { Box, Button, Card, CircularProgress, Link, Paper, TextField, Typography } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import { BASE_URL } from "../config"
import { useNavigate } from "react-router-dom"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { adminState } from "../store/atoms/admin"
import { userState } from "../store/atoms/user"

export const Login = ()=> {

    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const navigate = useNavigate()
    const setAdmin = useSetRecoilState(adminState)
    const setUser  = useSetRecoilState(userState)
    const user = useRecoilValue(userState)
    const admin = useRecoilValue(adminState)

    useEffect(()=>{
        if(admin.isAdmin || user.isUser){
            navigate('/')
        }
    },[admin,user])

    const handleLogin = async() => {
        try{
            const response = await axios.post(`${BASE_URL}/user/login`,{
                username,
                password
            })
            console.log(response.data)
            localStorage.setItem("token",`Bearer ${response.data.token}`)
        }catch(err){
            console.error(err)
        }
    }

    const handleClick = () => {
        navigate('/signup')
    }

    
    const demoUser = async() => {
        try{
            const username = 'test'
            const response = await axios.post(`${BASE_URL}/user/login`,{
                username ,
                password : 'test'
            })
            console.log(response.data.message)
            localStorage.setItem('token',`Bearer ${response.data.token}`)
            setUser({
                isUser : username
            })
            navigate('/')
        }catch(err){
            console.error(err)
        }
    }

    const demoAdmin = async() => {
        try{
            const username = 'testAdmin'
            const response = await axios.post(`${BASE_URL}/admin/login`,{
                username ,
                password : 'testAdmin'
            })
            console.log(response.data.message)
            localStorage.setItem("adminToken",`Bearer ${response.data.token}`)
            setAdmin({
                isAdmin: username
            })
            navigate('/adminDashboard')
        }catch(err){
            console.error(err)
        }
    }

    if(user.isLoading && admin.isLoading){
        return <CircularProgress color="secondary"></CircularProgress>
    }


    return <Box sx={{display:"flex",
                    flexDirection: 'column',
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
                        Sign In
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
                OR
                <Box sx={{display: 'flex',
                        flexDirection: 'column'
            }}>
                    <Button variant="contained"
                            onClick={demoUser}
                            sx={{m: '1rem',
                            color: 'black',
                            backgroundColor: '#ffd814'
                        }}>
                        Demo user
                    </Button>
                    <Button variant="contained"
                            onClick={demoAdmin}
                            sx={{backgroundColor: '#131921',
                                width: '18rem'
                        }}>
                        Demo Admin
                    </Button>
                </Box>
                <Box sx={{mt: '2rem',
                display: 'flex'}}>
                    <Typography>
                        New User?
                    </Typography>
                    <Link onClick={handleClick} sx={{color:'black',cursor:'pointer'}}>Register</Link>
                </Box>
                </Box>
            </Paper>
        </Card>
    </Box>
}