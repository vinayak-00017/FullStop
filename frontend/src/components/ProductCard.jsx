import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Box, Rating } from '@mui/material';


export default function ProductCard({product}) {
  return (
    <Box >
        <Box sx={{height:'auto'}} >
          <img src={product.imgLink} alt={product.productName}
                style={{width:'100%',height:'auto'}}
          />
        </Box>
        <Box sx={{pt:'1rem'}}>
            <Typography sx={{fontSize:{xs : '1rem', sm : '1.5rem'}}}>{product.productName}</Typography>
        </Box>
        <Box sx={{display: 'flex'}}>
            <Rating name="read-only" value={product.ratings.reduce((sum,rating) => sum + rating.rating, 0)/product.ratings.length } precision={0.1} readOnly />
            <Typography sx={{color: 'teal',cursor:'pointer',m:'0.1rem'}}>
                {`(${product.ratings.length})`}</Typography>
        </Box>
        <Box sx={{display : 'flex'}}>
            <Typography sx={{fontSize:{xs : '1.5rem', sm : '2rem'}}} >
            ${(product.price - ((product.price * product.discount)/100)).toFixed(2) }    
            </Typography>
            {product.discount > 0 && <Box>
            <Box sx={{display: 'flex'}}>
                <Typography  color="text.secondary" sx={{fontSize:{xs : '0.1rem', sm : '1rem'}}}>
                List :$
                </Typography>
                <Typography 
                            style={{textDecoration : 'line-through'}} 
                            color = 'text.secondary'
                >
                    {product.price} 
                </Typography>
            </Box>
                <Typography sx={{color : 'red'}} >
                    {product.discount}% off
                </Typography>
            </Box>}
         </Box>     
    </Box>


  );
}