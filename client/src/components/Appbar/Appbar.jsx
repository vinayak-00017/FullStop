import {  CircularProgress, useTheme, Typography, useMediaQuery, Badge } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { SearchBar } from "./SearchBar";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { useRecoilValue } from "recoil";
import { userState } from "../../store/atoms/user";
import { adminState } from "../../store/atoms/admin";
import BasicMenu from "./ProfileMenu";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { cartItemCount } from "../../store/selectors/cartItemCount";



export const Appbar = () => {
    const navigate = useNavigate();
    const user = useRecoilValue(userState)
    const admin = useRecoilValue(adminState)
    const theme = useTheme()
    // const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'))
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))
    const cartCount = useRecoilValue(cartItemCount)
    // const [cartClicked,setCartClicked] = React.useState(false)
    

    if(admin.isLoading || user.isLoading){
        return <CircularProgress color="secondary"></CircularProgress>
    }
    
    return <Box>
        <Box sx={{
            display : 'flex',
            justifyContent : 'space-between',
            alignItems : 'center',
            bgcolor: '#131921',
            padding : '0.4rem',
            pl : {xs: '1rem',sm:'4rem'},
            pr : {xs: '1rem',sm:'4rem'},
        
        }} >
           <Box>
                <Box onClick = {()=> navigate('/')}>
                <img src='/fullstop.png' alt="logo"
                    style={{width:isSmallScreen ? '3.5rem' : '5rem',height:'auto'}}
                ></img>
                </Box>
           </Box>   
           <Box></Box>
           {!isSmallScreen && <Box sx={{display : 'flex'}}>
               <SearchBar></SearchBar> 
           </Box>}
           {/* {isMediumScreen && <MenuIcon color="secondary" sx={{fontSize: '2.5rem'}}/>} */}
            <Box sx={{display: 'flex'}}>
            {admin.isAdmin && <Badge color="secondary" 
             sx={{color: 'white',cursor: 'pointer',ml:'1rem'}} onClick={() => {navigate('/admin-dashboard')}}>
                <AdminPanelSettingsIcon></AdminPanelSettingsIcon>
                <Typography sx={{display: {xs:'none',md:'block'}}}>Admin</Typography>
            </Badge>}
            <Box >
                {(user.isUser|| admin.isAdmin) ? <BasicMenu></BasicMenu>
                : <Badge color="secondary" 
                sx={{color: 'white',cursor: 'pointer'}} onClick={() => {navigate('/login')}}>
                   <AccountCircleIcon></AccountCircleIcon>
                   <Typography sx={{display: {xs:'none',md:'block'}}}>Sign in</Typography>
               </Badge>}
            </Box>
            <Box sx={{display: 'flex'}}>
            <Badge badgeContent={cartCount} color="secondary"
                     onClick={() => {
                        navigate('/cart')
                        }}
                        sx={{color:'white',cursor: 'pointer',ml: '1rem'}}>
                <ShoppingCartIcon></ShoppingCartIcon>
                <Typography sx={{display: {xs:'none',md:'block'}}}>Cart</Typography>
            </Badge>
            </Box>
           </Box>
        </Box><Box>
            {isSmallScreen&& <Box sx={{display : 'flex',
            alignItems : 'center',
            justifyContent: 'center',
            bgcolor: '#131921',
            pb: '1rem'
      }}>
               <SearchBar></SearchBar>       
           </Box>}
            </Box>       
    </Box>
}