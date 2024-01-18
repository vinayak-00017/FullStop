import { Box, Button, TextField } from "@mui/material"
import axios from "axios"
import { useState } from "react"
import { BASE_URL } from "../config"

export const Login = ()=> {

    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')

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


    return <Box>
        <Box>
            <TextField label='username'
                        variant="outlined"
                        type = 'text'
                        onChange={(e)=>setUsername(e.target.value)}
            >
            </TextField>
        </Box>
        <Box>
            <TextField
                label='password'
                variant="outlined"
                type='password'
                onChange={(e)=>setPassword(e.target.value)}
            ></TextField>
        </Box>
        <Box>
            <Button color="secondary" variant="contained"
                    onClick={handleLogin}
            >
                Login
            </Button>
        </Box>
    </Box>
}