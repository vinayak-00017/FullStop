import { Button, CircularProgress, useTheme, Typography, useMediaQuery } from "@mui/material";
import * as React from 'react';
import { Box } from "@mui/system";
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from "react-router-dom";
import { SearchBar } from "./SearchBar";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { useRecoilValue } from "recoil";
import { userState } from "../store/atoms/user";
import { adminState } from "../store/atoms/admin";
import BasicMenu from "./ProfileMenu";
import MenuIcon from '@mui/icons-material/Menu';

export const Appbar = () => {
    const navigate = useNavigate();
    const user = useRecoilValue(userState)
    const admin = useRecoilValue(adminState)
    const theme = useTheme()
    const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'))
    

    const handleProfile = () =>{
        if(user.isUser){
            
        }else{
            navigate('/login')
        }
    }

    if(admin.isLoading || user.isLoading){
        return <CircularProgress color="secondary"></CircularProgress>
    }
    
    return (
        <Box sx={{
            display : 'flex',
            justifyContent : 'space-between',
            alignItems : 'center',
            // bgcolor: '#e87121',
            bgcolor: '#131921',
            padding : '0.4rem',
            pl : {xs: '1rem',sm:'4rem'},
            pr : {xs: '1rem',sm:'4rem'},
        
        }} >
           <Box>
                <Box onClick = {()=> navigate('/')}>
                <img src='/fullstop.png' alt="logo"
                    style={{width:'5rem' ,height:'auto'}}
                ></img>
                </Box>
           </Box>   
           <Box></Box>
           <Box sx={{display : 'flex'}}>
               <SearchBar></SearchBar> 
                
                <Box >
                    <SearchIcon sx={{fontSize : {xs:'3rem',sm: '3rem'},
                                    color : 'white'
                }}></SearchIcon>
                </Box>   
           </Box>
           {isMediumScreen && <MenuIcon color="secondary"/>}
           {!isMediumScreen && <Box sx={{display: 'flex'}}>
            {admin.isAdmin && <Button onClick={()=>navigate('/adminDashboard')}>
                <AdminPanelSettingsIcon></AdminPanelSettingsIcon>
                <Typography sx={{display: {xs:'none',sm:'block'}}}>Admin</Typography>
            </Button>}
            <Box >
                <BasicMenu></BasicMenu>
            </Box>
            <Button onClick={() => {navigate('/cart')}}>
                <ShoppingCartIcon></ShoppingCartIcon>
                <Typography sx={{display: {xs:'none',sm:'block'}}}>Cart</Typography>
            </Button>
           </Box>}
        </Box>        
    )
}