import { Box, Button, Divider, Grid, Typography } from "@mui/material"
import { useRecoilValue } from "recoil"
import { cart } from "../../store/selectors/cart"
import { cartTotalPrice } from "../../store/selectors/cartTotalPrice"
import { CartProducts } from "../../components/Shipping/CartProducts"
import LockIcon from '@mui/icons-material/Lock';
import { useNavigate } from "react-router-dom"
import { user } from "../../store/selectors/user"

export const Cart = () => {
    
    const Scart = useRecoilValue(cart)
    const isUser = useRecoilValue(user)
    const total = useRecoilValue(cartTotalPrice).toFixed(2)
    const navigate = useNavigate()
    console.log(Scart.map((item)=>({                
        id : item.item._id,
        quantity : item.quantity,
        size : item.size           
    })))

    const handleClick = () =>{
        if(isUser){
            navigate('/shipping')
        }else{
            alert("login as a user to proceed")
            navigate('/login')
        }
    }


    return <Box sx={{display: 'flex', flexDirection: 'column', minHeight: '100vh',backgroundColor : '#e3e6e6',}}>
        {total!= 0 ?(<Box sx={{px: {xs:'2rem',md:'5rem',lg:'15rem'},
            pt : {xs:'1rem',md:'2rem',lg:'5rem'},
            }}>
            <Box sx={{backgroundColor:'#ffffff',
                textAlign : 'center',
                mb: '2rem'
            }}><Box sx={{display : 'flex',
                        justifyContent: 'center',
                        pt: '1rem',
                        
            }}>
               <Typography sx={{fontSize: {xs:'1.5rem',md:'2rem'}}}>Subtotal:</Typography> 
               <Typography sx={{fontWeight:'bold',
                                fontSize : {xs:'1.5rem',md:'2rem'},
                                pl: {xs:'0.3rem',md:'1rem'}
            }}>${total}</Typography>
               
            </Box>
            <Box sx={{p: '1rem'}}>
                <Button onClick={handleClick}
                variant='contained'
                sx={{backgroundColor : '#ffd814',
                        color: 'black',
                        width : {xs:'15rem',md:'30rem'}
                }}>
                    Proceed to Buy</Button>
               </Box>
               <Box>
                    <LockIcon sx={{fontSize: 'medium'}}></LockIcon> Secure transaction
                </Box>

                </Box>
                <Box >
                    {Scart.map((item) => (   
                        <Box key={item.item._id + item.size}>     
                            <CartProducts item={item} />
                        </Box>
                    ))}  
`           </Box>
    </Box>):(
                <Box sx={{height:'100vh',backgroundColor:'#f0e9f9'
                        ,display:'flex', justifyContent:'center',
                        alignItems: 'center',flexDirection:'column'
                }}>
                    <Typography sx={{fontSize:{xs:'2rem',md:'4rem'}}}>Cart is empty</Typography>
                    <Box sx={{height:{xs:'40vh',md:'70vh'}}}>
                        <img src="/cart.jpeg" style={{height:'100%'}}></img>
                    </Box>
                    <Button onClick={() =>navigate('/')}>Add Items</Button>               
                </Box>
            )}
             
    </Box>
}