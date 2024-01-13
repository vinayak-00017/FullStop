import { Button, Input, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from "react-router-dom";

export const Appbar = () => {
    const navigate = useNavigate();
    
    return (
        <Box sx={{
            display : 'flex',
            justifyContent : 'space-between',
            alignItems : 'center',
            bgcolor: '#e87121',
            padding : '0.4rem',
        
        }} >
           <Box>
                <Box onClick = {()=> navigate('/')}>
                <img src='fullstop.png' alt="logo"
                    style={{width:'5rem' ,height:'auto'}}
                ></img>
                </Box>
           </Box>   
           <Box sx={{display : 'flex'}}>
                <TextField variant="outlined"
                            placeholder="Search for products, brands and more"
                            sx={{width : '35rem'
                        }}
                        InputProps={{
                            style: {
                                color: 'white'
                            }                      
                            }}
                />                                  
                
                <Box >
                    <SearchIcon sx={{fontSize : '3rem',
                                    color : 'white'
                }}></SearchIcon>
                </Box>   
           </Box>
           <Box>
            <Button>
                <AccountCircleIcon></AccountCircleIcon>Profile
            </Button>
            <Button>
                Orders
            </Button>
            <Button>
                Cart
            </Button>
           </Box>
        </Box>        
    )
}