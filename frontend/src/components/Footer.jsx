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
        // position: 'absolute',
        // bottom: 0,
        // left: 0,
        // right: 0
        }}>
        <Box sx={{ display : 'flex' , alignItems: 'center', justifyContent: 'center',color:'white'}}>
            <CopyrightIcon fontSize="small"></CopyrightIcon>
            <Typography>
                2024 FullSTOP
            </Typography>
        </Box>
        <Box sx={{color: 'white'}}>
            <GitHubIcon fontSize='small'sx={{mr:'2rem'}}></GitHubIcon>
            <XIcon fontSize="small"></XIcon>
        </Box>
    </Box>
}