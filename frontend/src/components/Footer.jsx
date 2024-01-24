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
        pl : '4rem',
        pr : '4rem'
        }}>
        <Box sx={{ display : 'flex' , alignItems: 'center', justifyContent: 'center'}}>
            <CopyrightIcon fontSize="small"></CopyrightIcon>
            <Typography>
                2024 FullSTOP
            </Typography>
        </Box>
        <Box >
            <GitHubIcon fontSize='small'></GitHubIcon>
            <XIcon fontSize="small"></XIcon>
        </Box>
    </Box>
}