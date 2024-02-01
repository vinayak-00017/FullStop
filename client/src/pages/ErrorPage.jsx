import { Box, Button } from "@mui/material"
import { useNavigate } from "react-router-dom"


export const ErrorPage = () => {
    const navigate = useNavigate()

    return <Box sx={{height: '100vh',display: 'flex', justifyContent: 'center', alignItems:'center',flexDirection:'column'}}>
        <img src="/404.jpg" 
            style={{height : '60vh'}}
        ></img>
        <Button onClick={()=>navigate('/')}>
            GO BACK HOME
        </Button>
    </Box>
}