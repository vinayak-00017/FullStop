import { Box, Button, Card, Paper, Typography } from "@mui/material"
import ShoppingCart from "@mui/icons-material/ShoppingCart"
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil"
import { cartState } from "../store/atoms/cart"
import { useEffect, useState } from "react";
import LockIcon from '@mui/icons-material/Lock';



export const ActionBox = ({size,product}) => {

    const [cart, setCart] = useRecoilState(cartState)
    const [quantity,setQuantity] = useState(1)

    const navigate = useNavigate()

    const AddToCart = (item,quantity,size) => {  
        const itemIndex = cart.findIndex((cartItem) => cartItem.item._id === item._id && cartItem.size === size);
        if (itemIndex !== -1) {
            // If the item is in the cart, update its quantity
            const updatedCart = cart.map((cartItem, index) =>
            index === itemIndex
                ? { ...cartItem, quantity: cartItem.quantity + quantity }
                : cartItem
            );
            setCart(updatedCart);
          } else {
            // If the item is not in the cart, add a new entry
            setCart([...cart, { item, quantity, size }]);
          }
          navigate('/Cart')
    }


    return <Card variant="outlined"
    sx={{textAlign : 'center',}}
>
    <Paper elevation={3}>
        <Box sx={{display: 'flex',
                    flexWrap : 'wrap',
                    justifyContent : 'center',
                    p : '2rem'
    }}>
        <Box>
        <Typography sx={{fontSize : {xs : '2rem', sm : '2rem', md : '2rem' , lg : '2.5rem'}}}>
            ${(quantity*(product.price-(product.discount*product.price)/100)).toFixed(2)}</Typography>
        </Box>
        <Box>
            {product.inStock ? (
                <Typography sx={{color: 'green',
                                fontSize:{xs: '1rem',md : '1.5rem' ,lg : '1rem'}
                }}> 
                    In stock
                </Typography>
            ):(
                <Typography sx={{color: 'red',
                fontSize:{xs: '1rem'}
                }}> 
                    Out of stock
                </Typography>
            )}
        </Box>
        <Box>
            {product.inStock ? (
                    <><Box sx={{
                    p: '1rem',
                    display: 'flex'
                }}>
                    <Typography sx={{
                        pr: '1rem',
                        fontSize: { xs: '1rem', md: '1.2rem', lg: '1.5rem' }
                    }}>Quantity:</Typography>
                    <RemoveCircleOutlineIcon onClick={() => {
                        if (quantity > 1) {
                            setQuantity(quantity - 1);
                        }
                    } }></RemoveCircleOutlineIcon>
                    <Typography sx={{
                        pl: '0.5rem',
                        pr: '0.5rem'
                    }}>
                        {quantity}
                    </Typography>
                    <ControlPointIcon onClick={() => setQuantity(quantity + 1)}></ControlPointIcon>
                </Box><Box sx={{
                    pt: '1rem',
                    pb: '1rem'
                }}>
                        <Button variant='contained' color="secondary" size='large'
                            onClick={() => { AddToCart(product, quantity, size); } }
                            sx={{
                                borderRadius: 10,
                                backgroundColor: '#ffd814',
                                color: 'black',
                            }}
                        >
                            <ShoppingCart></ShoppingCart> Add to Cart
                        </Button>
                    </Box><Box sx={{ p: '1rem' }}>
                        <Button variant='contained' color="secondary" size='large'
                            sx={{ borderRadius: 10 }}
                        >
                            Buy now
                        </Button>
                    </Box>
                    <Box>
                        <LockIcon sx={{fontSize: 'medium'}}></LockIcon> Secure transaction
                    </Box>
                    </> 
            ): (
                <Button color="secondary" variant="contained"
                        sx={{borderRadius : 10}}
                >
                    Simailar items
                </Button>
            )}
       
        </Box>
        </Box>
    </Paper>
</Card>             
}