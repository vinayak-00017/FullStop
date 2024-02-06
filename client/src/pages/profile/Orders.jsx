import { Box, Button, Grid, Paper, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { BASE_URL } from "../../config"
import axios from 'axios'
import { useNavigate } from "react-router-dom"

export const Orders = () =>{

    const [orders,setOrders] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const getOrders = async() =>{
            try{
                const response = await axios.get(`${BASE_URL}/user/orders`,{headers:{
                    authentication : localStorage.getItem('token')
                }})
                setOrders(response.data)
            }catch(err){
                console.error(err)
            }
        }
        getOrders()
    },[])

    return <Box sx={{mx:{xs:'1rem',md:'4rem',lg:'10rem'},my:'2rem',}}>
        <Typography sx={{fontSize:{xs:'3rem',md:'4rem'}}}>
            Orders
        </Typography>
        <Box>        
            {orders.map((order)=>{
                return <Paper elevation={5} sx={{backgroundColor:'#e3e6e6',p:'0.5rem',m:'1rem'}}>
                <Grid container key={order._id} spacing={3} sx={{m:'1rem',p:'1rem'}}>
                    <Grid item md={4}>
                        {order._id}
                    </Grid>
                    <Grid item md={2}>
                        {order.date}
                    </Grid>
                    <Grid item md={2}>
                       ${(order.totalPrice).toFixed(2)}
                    </Grid>
                    <Grid item md={2}>
                        {order.isDelivered ? (
                            <Typography sx={{color: 'green'}}>
                                delivered
                            </Typography>
                        ):(
                            <Typography sx={{color: 'orange'}}>
                                dispached
                            </Typography>
                        )}
                    </Grid>
                    <Grid item md={2}>
                        <Button variant="contained"
                            onClick={()=> navigate(`/order-details/${order._id}`)}
                        >
                           Details 
                        </Button>
                    </Grid>
                </Grid>
               </Paper> 
            })}              
        </Box>
    </Box>
}