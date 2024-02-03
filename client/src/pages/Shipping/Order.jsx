import { Box, Button, Divider, Grid, Paper, Typography } from "@mui/material"
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { PayPalOrder } from "../../components/Shipping/PayPalOrder";
import { useRecoilValue } from "recoil";
import { cart } from "../../store/selectors/cart";
import { useNavigate } from "react-router-dom";
import { cartTotalPrice } from "../../store/selectors/cartTotalPrice";
import { addressState } from "../../store/atoms/address";
import { buynowState } from "../../store/atoms/buynow";
import { DemoPay } from "../../components/Shipping/DemoPay";

export const Order = () =>{
    let cartItems = useRecoilValue(cart);
   const buynow = useRecoilValue(buynowState)
   let total = useRecoilValue(cartTotalPrice)
   const navigate = useNavigate()
    const address = useRecoilValue(addressState)
    const initialOptions = {
        clientId: "AeS8drftXNk55XdSuHzK28ZlaPKVI-7d-VGTlWYdDdFbZ2tY7QlbUaI-XN51KKIRt45jNV-Nb4iT88lC",
        currency: "USD",
        intent: "capture",
    };

   if(buynow.product){
    cartItems = buynow.product
    total = buynow.total
   }
   
   console.log(cartItems)

    return(
        <Grid container spacing={2} sx={{p:{xs:'1rem',md:'3rem'}}}>
            <Grid item xs={12} md={8}>
               <Box sx={{mb:'1rem'}}>
                   <Typography sx={{fontSize:{xs:'2rem',md:'3rem'}}}>
                        Shipping
                    </Typography> 
                    <Typography>
                        Name : {address.name}
                    </Typography>
                    <Typography>
                        Mobile no : {address.mobileNumber}
                    </Typography>
                    <Typography>
                        Address : {address.houseAddress}, {address.zip}, {address.city}, {address.country}
                    </Typography>
               </Box>
               <Divider></Divider>
               <Box sx={{my:'1rem'}}>
                    <Typography sx={{fontSize: {xs:'2rem',md:'3rem'}}}>
                        Payment Method 
                    </Typography>
                    <Typography>
                        PayPal / Debit Card / Credit Card
                    </Typography>
               </Box>
               <Divider></Divider>
               <Box sx={{my:'1rem'}}>
                    <Typography sx={{fontSize: {xs:'2rem',md:'3rem'}}}>
                        Items
                    </Typography>
                    {cartItems.map((item)=>{
                        return<Box>
                            <Box onClick={()=>navigate(`/product/${item.item._id}`)}
                                sx={{display:'flex', height:{xs:'3rem',md:'4rem'},p:'1rem',
                                    justifyContent:'space-between',
                                    cursor:'pointer'
                        }}>
                                <img src={item.item.imgLink}></img>
                                <Typography sx={{fontSize:{xs:'0.7rem',md:'1rem'}}}>
                                    {item.item.productName} (size: {item.size})
                                </Typography>
                                <Typography sx={{fontSize:{xs:'0.7rem',md:'1rem'}}}>
                                    {item.quantity} x ${(item.item.price-(item.item.discount*item.item.price)/100).toFixed(2)} = 
                                    ${item.quantity * (item.item.price-(item.item.discount*item.item.price)/100).toFixed(2)}
                                </Typography>
                                </Box>
                                <Divider></Divider>
                            </Box>
                    })}
               </Box>
            </Grid>
            <Grid item xs={12} md={4}>
                <Box >
                    <Paper sx={{p:'1rem 2rem',backgroundColor:'#e3e6e6'}}>
                        <Typography sx={{fontSize:'2rem'}}>
                            Order Summary
                        </Typography>
                        <Divider></Divider>
                        <Box sx={{m:'1rem'}}>
                            <Box sx={{display:'flex',justifyContent:"space-between"}}>
                                Items 
                                <Typography>
                                ${cartItems.reduce((total, item) => total + item.item.price * item.quantity, 0).toFixed(2)}
                                </Typography>
                            </Box>
                            <Box sx={{display:'flex',justifyContent:"space-between"}}>
                                Discount
                                <Typography>
                                -$ {(cartItems.reduce((total,item)=> total + item.item.discount* item.item.price * item.quantity,0)/100).toFixed(2)}
                                </Typography>
                            </Box>
                            <Box sx={{display:'flex',justifyContent:"space-between"}}>
                                Shipping
                                <Typography>
                                $ 0
                                </Typography>
                            </Box>
                            <Box sx={{display:'flex',justifyContent:"space-between"}}>
                                Tax 
                                <Typography>
                                $ 0
                                </Typography>
                            </Box>
                            <Box sx={{display:'flex',justifyContent:"space-between"}}>
                                Total 
                                <Typography>
                                ${total.toFixed(2)}
                                </Typography>
                            </Box>
                        </Box>
                        <DemoPay></DemoPay>
                        <Divider></Divider>
                        <Box sx={{mt:'1rem'}}>
                            <PayPalScriptProvider options={ initialOptions }> 
                                <PayPalOrder></PayPalOrder>
                            </PayPalScriptProvider >
                        </Box>
                    </Paper>
                </Box>
            </Grid>
    </Grid>
)}