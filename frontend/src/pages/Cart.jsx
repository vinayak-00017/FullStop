import { Box, Button, Divider, Grid, Typography } from "@mui/material"
import { useRecoilValue } from "recoil"
import { cart } from "../store/selectors/cart"
import { cartTotalPrice } from "../store/selectors/cartTotalPrice"
import { CartProducts } from "../components/CartProducts"
import LockIcon from '@mui/icons-material/Lock';
import { useNavigate } from "react-router-dom"
import { PayButton } from "../components/PayButton"

export const Cart = () => {
    
    const Scart = useRecoilValue(cart)
    const total = useRecoilValue(cartTotalPrice).toFixed(2)
    const navigate = useNavigate()

    console.log(Scart)

    return (
        <Box sx={{pl: '15rem',
            pr : "15rem",
            pt : '5rem',
            backgroundColor : '#e3e6e6',
            }}>
            {total!= 0 ?(<Box sx={{backgroundColor:'#ffffff',
                textAlign : 'center',
                mb: '2rem'
            }}><Box sx={{display : 'flex',
                        justifyContent: 'center',
                        pt: '1rem',
                        
            }} >
               <Typography sx={{fontSize: '2rem'}}>Subtotal:</Typography> 
               <Typography sx={{fontWeight:'bold',
                                fontSize : '2rem',
                                pl: '1rem'
            }}>${total}</Typography>
               
            </Box>
            <Box sx={{p: '1rem'}}>
                <Button onClick={()=>navigate('/order')}
                variant='contained'
                sx={{backgroundColor : '#ffd814',
                        color: 'black',
                        width : '30rem'
                }}>
                    Proceed to Buy</Button>
                    <PayButton></PayButton>
               </Box>
               <Box>
                    <LockIcon sx={{fontSize: 'medium'}}></LockIcon> Secure transaction
                </Box>
                </Box>):(
                <Box>
                    <Typography>Cart is empty</Typography>
                </Box>
            )}
             <Box >
                    {Scart.map((item) => (   
                        <Box key={item.item._id + item.size}>     
                            <CartProducts item={item} />
                        </Box>
                    ))}  
`           </Box>
    </Box>
    
    )
}