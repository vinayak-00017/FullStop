import { Box, Divider, Grid, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"
import CustomizedMenus from "../DropDownMenu"
import { useRecoilState } from "recoil"
import { cartState } from "../../store/atoms/cart"
import { useEffect } from "react"


export const CartProducts = ({item}) => {
    const [cart,setCart] = useRecoilState(cartState)
    const navigate = useNavigate()

    useEffect(() => {
        localStorage.setItem('cart',JSON.stringify(cart))
    }, [cart]);
    
    
    const handleDelete = () =>{
        setCart(cart.filter(i => !(i.item._id === item.item._id && i.size === item.size)))
        localStorage.setItem('cart',JSON.stringify(cart))
    }

    const updateQuantity = (num) =>{
        setCart(cart.map(i => i.item._id === item.item._id && i.size === item.size 
            ? {...i, quantity : num}
            :i
            ))
    }

    return <Box>
                <Box 
                sx={{backgroundColor:'#ffffff',
                display : 'flex',
                p : '1.5rem'
                    }}>
            <Grid container spacing={5}>
                <Grid item md={3.5} >
                    <Box onClick={()=> navigate(`/product/${item.item._id}`) }
                    height={150}
                    sx={{cursor : 'pointer'}}
                    >
                        <img src={item.item.imgLink} style={{maxHeight : '100%'}}></img>
                    </Box>
                </Grid>
                <Grid item md={6}>
                    <Box>
                        <Typography onClick={()=> navigate(`/product/${item.item._id}`)} sx={{cursor: 'pointer'}}>
                            {item.item.productName} 
                        </Typography>
    
                        <Typography sx={{color : 'green'}}>In stock</Typography>
                        <Typography>Size: {item.size}</Typography>
                        <Typography>Qunatity: </Typography>
                            <CustomizedMenus end = {10} start ={1} def={item.quantity} handleSize={updateQuantity}>
                            </CustomizedMenus>   
                        <Typography sx={{color : 'teal',cursor: 'pointer',pt: '0.5rem'}}
                                    onClick={handleDelete}
                        >Delete</Typography>
                    </Box>                                
                </Grid>
                <Grid item md={2.5}>
                    {(item.item.discount >0) &&<Typography 
                            sx={{color : 'red'}}
                    >{item.item.discount}% off</Typography>}
                    ${(item.item.price-(item.item.discount*item.item.price)/100).toFixed(2)}
                    <Box sx={{display : 'flex',
                                    fontSize : {xs : '0.7rem',sm : '1rem',md : '1.2rem',lg : '1.5rem'},
                    }}>
                            <Typography sx={{color : '#979898'}}>List Price : $</Typography>
                            <Typography sx={{textDecoration : 'line-through',
                                        color : '#979898'    
                        }}>
                                {item.item.price}</Typography>
                        </Box>
                </Grid>
            </Grid>
        </Box>
        <Divider></Divider>
    </Box>
}