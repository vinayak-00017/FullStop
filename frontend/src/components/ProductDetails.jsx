import { Box, Button, Card, Grid, Paper, Rating, Typography } from "@mui/material"
import CustomizedMenus from "./DropDownMenu"
import {  useState } from "react"
import { ActionBox } from "./ActionBox";


export const ProductDetails = ({product}) => {
 
    const [size,setSize] = useState(7)


    const handleSize = (s) =>{
        setSize(s)
    }


    return<Grid container spacing={2}>
            <Grid item xs={12} md ={4.5}  >
                <Box >
            
                <img src={product.imgLink} alt={product.productName}
                    style={{width:'100%',height:'auto'}}
                ></img>
                </Box>
            </Grid>
            <Grid item xs={12} md = {4.5}  >
                <Box sx={{ pl: { sm: '0', md: '4rem' } }}>        
                    <Box >
                    <Typography sx={{ fontSize: { xs: '1rem', sm: '2rem', md: '2.3rem' ,lg : '3rem' } }}>
                        {product.productName}</Typography>
                    
                    </Box>
                    <Box>
                        {product.ratings && product.ratings[0] &&
                        <Rating name="read-only" value={product.ratings[0].rating} precision={0.1} readOnly />
                            }
                    </Box>
                    <Box sx={{display : 'flex',
                            pt : '2rem'
                }}>
                        <Typography sx={{color : 'red',
                                        fontSize : {xs : '1rem',sm : '1.5rem',md : '1.8rem',lg : '2rem'},
                                        fontWeight : 'bold'    
                    }}
                        >-{product.discount}%</Typography>
                        <Typography 
                        sx={{fontSize : {xs : '2rem', sm : '2.5rem', md : '2.5rem' , lg : '3.5rem'}}}>
                            ${(product.price-(product.discount*product.price)/100).toFixed(2)}
                            </Typography>
                    </Box>
                    <Box sx={{display : 'flex',
                                fontSize : {xs : '0.7rem',sm : '1rem',md : '1.2rem',lg : '1.5rem'},
                }}>
                        <Typography variant="h7">List Price : $</Typography>
                        <Typography variant="h7" sx={{textDecoration : 'line-through'}}>{product.price}</Typography>
                    </Box>
                    <Box sx={{display: "flex"}}>
                    <Box sx={{p : '1rem'
                            , display: 'flex'
                }}> 
                        <Typography sx={{pr: '1rem'
                                        , fontSize : {xs : '0.6rem',sm : '0.9rem',md : '1.2rem',lg : '1.5rem'}
                    }}>Size:</Typography>
                        <CustomizedMenus start={5} end={12} def={7} handleSize={handleSize}></CustomizedMenus>
                    </Box>
                    </Box>
                    
                </Box>
            </Grid>
            <Grid item xs={12} md={3}> 
                    <ActionBox size={size} product={product} ></ActionBox>
              
            </Grid>
        </Grid>
  
}