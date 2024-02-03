import { Box, Button, Divider } from "@mui/material"
import EngineeringIcon from '@mui/icons-material/Engineering';

export const DemoPay = () =>{

    const handleClick = () => {
        
    }

    return<Box sx={{display:'flex',justifyContent:'center',my:'1rem'}}>
        <Button onClick={handleClick} 
        variant="contained" sx={{
            backgroundColor: '#005028',
            color: 'white',
            width: '100%',
            borderRadius:'0.3rem',
            height:'3rem'
        }}>
            <EngineeringIcon></EngineeringIcon>
            Pay as tester
        </Button>
    </Box>
}