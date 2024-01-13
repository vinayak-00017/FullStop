import { Box, Container, Grid, Rating, Typography } from "@mui/material"

export const ProductDetails = ({product}) => {
    return<Grid container spacing={2}>
            <Grid item xs={12} md ={6}  >
                <Box >
                {/* <Typography variant="h1"> {product.price}</Typography> */}
                <img src={product.imgLink} alt={product.productName}
                    style={{width:'100%',height:'auto'}}
                ></img>
                </Box>
            </Grid>
            <Grid item xs={12} md = {6}  >
                <Box sx={{pl : '4rem'}}>        
                    <Box >
                    <Typography variant="h2">{product.productName}</Typography>
                    
                    </Box>
                    <Box>
                        {product.ratings && product.ratings[0] &&
                        <Rating name="read-only" value={product.ratings[0].rating} precision={0.1} readOnly />
                            }
                    </Box>
                    <Box>
                        <Typography variant="h2">${product.price}</Typography>
                    </Box>
                </Box>
            </Grid>
        </Grid>
  
}