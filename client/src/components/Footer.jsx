import { Box, Typography } from "@mui/material"
import GitHubIcon from '@mui/icons-material/GitHub';
import XIcon from '@mui/icons-material/X';
import CopyrightIcon from '@mui/icons-material/Copyright';


export const Footer = () => {
    return <Box sx={{
        display : 'flex',
        justifyContent : 'space-between',
        alignItems : 'center',
        padding : '0.4rem',
        pl : {xs:'2rem',sm:'5rem',md:'10rem'},
        pr : {xs:'2rem',sm:'5rem',md:'10rem'},
        bgcolor:'#131921' ,
        mt:'auto'
        }}>
        <Box sx={{ display : 'flex' , alignItems: 'center', justifyContent: 'center',color:'white'}}>
            <CopyrightIcon fontSize="small"></CopyrightIcon>
            <Typography>
                2024 FullSTOP
            </Typography>
        </Box>
        <Box sx={{color: 'white'}}>
            <a>

            <GitHubIcon fontSize='small'sx={{mr:'2rem',cursor:'pointer'}} onClick={()=>{window.open('https://github.com/vinayak-00017/FullStop')}}></GitHubIcon>
            </a>
            <XIcon fontSize="small" sx={{cursor:'pointer'}} onClick={()=>{window.open('https://twitter.com/Vinayak00017')}}></XIcon>
        </Box>
    </Box>
}