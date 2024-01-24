import { Paper ,Box, TextField, Button} from "@mui/material"
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
            localStorage.setItem("token",`Bearer ${response.data.token}`)
            navigate('/adminDashboard')
        }catch(err){
            console.error(err)
        }
    }


    return <Box 
                sx={{display : 'flex',
                    alignItems  : 'center',
                    justifyContent : 'center',
                    width : '20rem',
                    p : '20rem'
            }}
        >
        <Paper elevation={4}>
            <Box>
                <TextField label="username"
                            variant="outlined"
                            type="text"
                            onChange={(e)=>setUsername(e.target.value)}
                >

                </TextField>
            </Box>
            <Box>
                <TextField
                        label="password"
                        variant="outlined"
                        type="password"
                        onChange={(e)=>setPassword(e.target.value)}
                >
                </TextField>
            </Box>
            <Box>
                <Button variant="contained"
                        onClick={handleLogin}
                >
                    Login
                </Button>
            </Box>

        </Paper>
    </Box>
}