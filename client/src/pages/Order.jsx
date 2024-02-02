import { Box, Divider, Grid, Paper, Typography } from "@mui/material"
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { PayPalOrder } from "../components/PayPalOrder";
import { useRecoilValue } from "recoil";
import { cart } from "../store/selectors/cart";

export const Order = () =>{

   const cartItems = useRecoilValue(cart) 
   console.log(cartItems)

    const initialOptions = {
        clientId: "AeS8drftXNk55XdSuHzK28ZlaPKVI-7d-VGTlWYdDdFbZ2tY7QlbUaI-XN51KKIRt45jNV-Nb4iT88lC",
        currency: "USD",
        intent: "capture",
    };

    return(
        <Grid container spacing={2} sx={{p:'3rem'}}>
            <Grid item xs={8}>
               <Box sx={{mb:'1rem'}}>
                   <Typography sx={{fontSize:'3rem'}}>
                        Shipping
                    </Typography> 
                    <Typography>
                        Name : 
                    </Typography>
                    <Typography>
                        Mobile no : 
                    </Typography>
                    <Typography>
                        Address : 
                    </Typography>
               </Box>
               <Divider></Divider>
               <Box sx={{my:'1rem'}}>
                    <Typography sx={{fontSize: '3rem'}}>
                        Payment Method 
                    </Typography>
                    <Typography>
                        PayPal / Debit Card / Credit Card
                    </Typography>
               </Box>
               <Divider></Divider>
               <Box sx={{my:'1rem'}}>
                    <Typography sx={{fontSize: '3rem'}}>
                        Items
                    </Typography>
                    {cartItems.map((item)=>{
                        return<Box>
                            <Box sx={{display:'flex', height:'4rem',p:'1rem',
                                    justifyContent:'space-between'
                        }}>
                                <img src={item.item.imgLink}></img>
                                {item.item.productName}
                                </Box>
                                <Divider></Divider>
                            </Box>
                    })}
               </Box>
            </Grid>
            <Grid item xs={4}>
                <Box >
                    <Paper sx={{p:'1rem 2rem',backgroundColor:'#e3e6e6'}}>
                        <Typography sx={{fontSize:'2rem'}}>
                            Order Summary
                        </Typography>
                        <Divider></Divider>
                        <Box sx={{m:'1rem'}}>
                            <Typography>
                                Items 
                            </Typography>
                            <Typography>
                                Shipping
                            </Typography>
                            <Typography>
                                Tax
                            </Typography>
                            <Typography>
                                Total
                            </Typography>
                        </Box>
                        <PayPalScriptProvider options={ initialOptions }> 
                            <PayPalOrder></PayPalOrder>
                        </PayPalScriptProvider >
                    </Paper>
                </Box>
            </Grid>
    </Grid>
)}