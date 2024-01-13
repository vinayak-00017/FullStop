import * as React from 'react';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
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
        <Box>
            <Rating name="read-only" value={product.ratings[0].rating} precision={0.1} readOnly />
        </Box>
        <Box sx={{display : 'flex'}}>
            <Typography sx={{fontSize:{xs : '1.5rem', sm : '2rem'}}} >
            ${(product.price - ((product.price * product.discount)/100)).toFixed(2) }    
            </Typography>
            <div style={{display: 'flex',
                          fontSize:{xs : '0.7rem', sm : '1rem'}
                       }}>
                <Typography  color="text.secondary">
                List :$
                </Typography>
                <Typography 
                            style={{textDecoration : 'line-through'}} 
                            color = 'text.secondary'
                >
                    {product.price}
                </Typography>
            </div>
         </Box>     
    </Box>


    // <Card sx={{ maxWidth: 400 ,height : 300 }}>
    //   <CardMedia
    //     sx={{ height: 300 ,objectFit: 'contain'}}
    //     image= {product.imgLink}
    //     title={product.productName}
    //   />
    //   <CardContent>
    //     <Typography gutterBottom variant="h5" component="div">
    //       {product.productName}
    //     </Typography>
    //     <Rating name="read-only" value={product.ratings[0].rating} precision={0.1} readOnly />
    //     <div style={{display: 'flex'}}>
    //         <Typography variant="h4" >
    //         ${product.price - ((product.price * product.discount)/100) }
    //         </Typography>
    //         <div style={{display: 'flex',  
    //                     marginLeft:'0.7rem',
    //                      marginTop:'0.7rem'}}>
    //             <Typography variant="h7" color="text.secondary">
    //             List :$
    //             </Typography>
    //             <Typography variant='h7'
    //                         style={{textDecoration : 'line-through'}} 
    //                         color = 'text.secondary'
    //             >
    //                 {product.price}
    //             </Typography>
    //         </div>
            

    //     </div>
       
    //   </CardContent>
    //   <CardActions>
      
    //   </CardActions>

    // </Card>
  );
}