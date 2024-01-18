import { Paper ,Box, TextField, Button} from "@mui/material"
import { useState } from "react"
import { BASE_URL } from "../config"
import axios from 'axios'

export const Signup = () => {

    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')

    const handleSignup = async() => {
        try{
            const response = await axios.post(`${BASE_URL}/user/signup`,{
                username,
                password
            }) 
            console.log(response.data)
            localStorage.setItem("token",`Bearer ${response.data.token}`)
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
                <Button color="secondary" variant="contained"
                        onClick={handleSignup}
                >
                    Signup
                </Button>
            </Box>

        </Paper>
    </Box>
}