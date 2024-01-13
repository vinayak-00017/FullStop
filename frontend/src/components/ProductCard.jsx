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
    <Box>
        <Paper elevation={3}>
        <Box sx={{height:300}} >
          <img src={product.imgLink} alt={product.productName}
                style={{width:'100%',height:'auto'}}
          />
        </Box>
        <Box>
            <Typography variant="h4">{product.productName}</Typography>
        </Box>
        <Box>
            <Rating name="read-only" value={product.ratings[0].rating} precision={0.1} readOnly />
        </Box>
        <Box sx={{display : 'flex'}}>
            <Typography variant="h4" >
            ${product.price - ((product.price * product.discount)/100) }    
            </Typography>
            <div style={{display: 'flex',  
                        marginLeft:'0.7rem',
                         marginTop:'0.7rem'}}>
                <Typography variant="h7" color="text.secondary">
                List :$
                </Typography>
                <Typography variant='h7'
                            style={{textDecoration : 'line-through'}} 
                            color = 'text.secondary'
                >
                    {product.price}
                </Typography>
            </div>
         </Box>     
        </Paper> 
    </Box>


    // <Card sx={{ maxWidth: 400 ,height : 300 }}>
    // <Paper elevation={3}>
    //   <CardMedia
    //     sx={{ height: 200 ,objectFit: 'contain'}}
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
    //   </Paper>
    // </Card>
  );
}