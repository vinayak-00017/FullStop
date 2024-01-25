import { Button, Input, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from "react-router-dom";
import { SearchBar } from "./SearchBar";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

export const Appbar = () => {
    const navigate = useNavigate();
    
    return (
        <Box sx={{
            display : 'flex',
            justifyContent : 'space-between',
            alignItems : 'center',
            // bgcolor: '#e87121',
            bgcolor: '#131921',
            padding : '0.4rem',
            pl : '4rem',
            pr : '4rem',
        
        }} >
           <Box>
                <Box onClick = {()=> navigate('/')}>
                <img src='/fullstop.png' alt="logo"
                    style={{width:'5rem' ,height:'auto'}}
                ></img>
                </Box>
           </Box>   
           <Box sx={{display : 'flex'}}>
               <SearchBar></SearchBar> 
                
                <Box >
                    <SearchIcon sx={{fontSize : '3rem',
                                    color : 'white'
                }}></SearchIcon>
                </Box>   
           </Box>
           <Box>
            <Button onClick={()=>navigate('/adminDashboard')}>
                <AdminPanelSettingsIcon></AdminPanelSettingsIcon>
                <Typography sx={{display: {xs:'none',sm:'block'}}}>Admin</Typography>
            </Button>
            <Button onClick={()=>navigate('/login')}>
                <AccountCircleIcon></AccountCircleIcon>
                <Typography sx={{display: {xs:'none',sm:'block'}}}>Profile</Typography>
            </Button>
            <Button onClick={() => {navigate('/cart')}}>
                <ShoppingCartIcon></ShoppingCartIcon>
                <Typography sx={{display: {xs:'none',sm:'block'}}}>Cart</Typography>
            </Button>
           </Box>
        </Box>        
    )
}