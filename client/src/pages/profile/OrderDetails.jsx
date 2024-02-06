import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { BASE_URL } from "../../config";
import { Box, Button, CircularProgress, Divider, Grid, Paper, Typography } from "@mui/material"
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import LinearDeterminate from "../../components/Shipping/LinearBar";
import DoneAllIcon from '@mui/icons-material/DoneAll';


export const OrderDetails = () => {

    const [orderedItems,setOrderedItems] = useState([])
    const [address,setAddress] = useState({})
    const [total, setTotal] = useState('')
    const {id} = useParams()
    const [loading,setLoading] = useState(true)
    const [isDelivered,setIsDelivered] = useState(false)
    
    useEffect(() => {
        const getOrderDetails = async() =>{
                try{
                    const response = await axios.get(`${BASE_URL}/user/order/${id}`,{
                        headers:{
                            authentication : localStorage.getItem('token')
                        }
                    })
                    setAddress(response.data.address)
                    setTotal(response.data.totalPrice)
                    setIsDelivered(response.data.isDelivered)
                    setOrderedItems(response.data.products)
                    setLoading(false)
                }catch(err) {
                    console.error(err)
                }         
        }
        getOrderDetails()
    },[])

    if(loading  ){
        return<Box>
            <CircularProgress color="secondary"></CircularProgress>
        </Box>
    }

    return  <Grid container spacing={2} sx={{p:{xs:'1rem',md:'3rem'}}}>
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
            Status
        </Typography>
        {!isDelivered ? (<Box>
            <Typography sx={{display:'flex',justifyContent:'space-between'}}>
                Dispached, ON THE WAY
                <LocalShippingIcon></LocalShippingIcon>
            </Typography>
            <Box sx={{ width: '100%' ,my:'1rem'}}>
                <LinearDeterminate targetValue={40}></LinearDeterminate>
            </Box>
        </Box>):(
            <Box>
                <Typography sx={{display:'flex', justifyContent:'space-between'}}>
                    Delivered
                    <TaskAltIcon></TaskAltIcon>
                </Typography>
                <Box sx={{ width: '100%' ,my:'1rem'}}>
                    <LinearDeterminate targetValue={100}></LinearDeterminate>
                </Box>
            </Box>    
        )}
       </Box>
       <Divider></Divider>
       <Box sx={{my:'1rem'}}>
            <Typography sx={{fontSize: {xs:'2rem',md:'3rem'}}}>
                Items
            </Typography>
            {orderedItems.map((item)=>{
                return<Box key={item.productId._id}>
                    <Box onClick={()=>navigate(`/product/${item.productId._id}`)}
                        sx={{display:'flex', height:{xs:'3rem',md:'4rem'},p:'1rem',
                            justifyContent:'space-between',
                            cursor:'pointer'
                }}>
                        <img src={item.productId.imgLink}></img>
                        <Typography sx={{fontSize:{xs:'0.7rem',md:'1rem'}}}>
                            {item.productId.productName} (size: {item.size})
                        </Typography>
                        <Typography sx={{fontSize:{xs:'0.7rem',md:'1rem'}}}>
                            {item.quantity} x ${(item.productId.price-(item.productId.discount*item.productId.price)/100).toFixed(2)} = 
                            ${item.quantity * (item.productId.price-(item.productId.discount*item.productId.price)/100).toFixed(2)}
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
                        ${orderedItems.reduce((total, item) => total + item.productId.price * item.quantity, 0).toFixed(2)}
                        </Typography>
                    </Box>
                    <Box sx={{display:'flex',justifyContent:"space-between"}}>
                        Discount
                        <Typography>
                        -$ {(orderedItems.reduce((total,item)=> total + item.productId.discount* item.productId.price * item.quantity,0)/100).toFixed(2)}
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
                        ${parseFloat(total).toFixed(2)}
                        </Typography>
                    </Box>
                </Box>
            </Paper>
        </Box>
        <Paper sx={{display:'flex',justifyContent:'center',mt:'1rem',backgroundColor:'#e3e6e6'}}>
            <Typography sx={{fontSize:{xs:'2rem',md:'3rem'},color:'green'}}>
                <DoneAllIcon sx={{fontSize:{xs:'2rem',md:'3rem'}}}></DoneAllIcon>
                PAID
            </Typography>
        </Paper>
    </Grid>
</Grid>
}