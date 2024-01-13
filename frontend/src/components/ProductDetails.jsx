import { Box, Container, Grid, Rating, Typography } from "@mui/material"

export const ProductDetails = ({product}) => {
    return<Grid container spacing={2}>
            <Grid item xs={12} md ={6}  >
                <Box >
            
                <img src={product.imgLink} alt={product.productName}
                    style={{width:'100%',height:'auto'}}
                ></img>
                </Box>
            </Grid>
            <Grid item xs={12} md = {6}  >
                <Box sx={{ pl: { sm: '0', md: '4rem' } }}>        
                    <Box >
                    <Typography sx={{ fontSize: { xs: '1rem', sm: '2rem', md: '3rem' ,lg : '4rem' } }}>{product.productName}</Typography>
                    
                    </Box>
                    <Box>
                        {product.ratings && product.ratings[0] &&
                        <Rating name="read-only" value={product.ratings[0].rating} precision={0.1} readOnly />
                            }
                    </Box>
                    <Box sx={{display : 'flex',
                            pt : '2rem'
                }}>
                        <Typography variant="h4"
                                    sx={{color : 'red'}}
                        >-{product.discount}%</Typography>
                        <Typography variant="h3">${(product.price-(product.discount*product.price)/100).toFixed(2)}</Typography>
                    </Box>
                    <Box sx={{display : 'flex'}}>
                        <Typography variant="h7">List Price : $</Typography>
                        <Typography variant="h7" sx={{textDecoration : 'line-through'}}>{product.price}</Typography>
                    </Box>
                </Box>
            </Grid>
        </Grid>
  
}