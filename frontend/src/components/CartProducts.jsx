import { Box, Divider, Grid, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"
import CustomizedMenus from "./DropDownMenu"
import { useRecoilState } from "recoil"
import { cartState } from "../store/atoms/cart"


export const CartProducts = ({item}) => {
    const [cart,setCart] = useRecoilState(cartState)
    const navigate = useNavigate()
    
    
    const handleDelete = () =>{
        setCart(cart.filter(i => !(i.item._id === item.item._id && i.size === item.size)))
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
                p : '2rem'
                    }}>
            <Grid container spacing={5}>
                <Grid item md={3.5} >
                    <Box onClick={()=> navigate(`/product/${item.item._id}`)}
                    height={150}
                    >
                        <img src={item.item.imgLink} style={{maxHeight : '100%'}}></img>
                    </Box>
                </Grid>
                <Grid item md={6}>
                    <Box>
                        <Typography onClick={()=> navigate(`/product/${item.item._id}`)}>
                            {item.item.productName} 
                        </Typography>
    
                        <Typography sx={{color : 'green'}}>In stock</Typography>
                        <Typography>Size: {item.size}</Typography>
                        <Typography>Qunatity: </Typography>
                            <CustomizedMenus end = {10} start ={1} def={item.quantity} handleSize={updateQuantity}>
                            </CustomizedMenus>   
                        <Typography sx={{color : 'teal'}}
                                    onClick={handleDelete}
                        >Delete</Typography>
                    </Box>                                
                </Grid>
                <Grid item md={2.5}>
                    <Typography 
                            sx={{color : 'red'}}
                    >{item.item.discount}% off</Typography>
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