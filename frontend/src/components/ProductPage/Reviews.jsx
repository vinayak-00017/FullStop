import { Box, Button, Divider, Grid, Rating, Typography } from "@mui/material"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FormDialog from "./ReviewDialog";

export const Reviews = ({ratings,avg}) => {
    return <Box id='reviews'>
        <Typography sx={{fontWeight: 'bold',
                    fontSize : '1.5rem',
                    p : '0.5rem'
    }}>
            Customer Ratings
        </Typography>
        <Grid container spacing={4}>
           <Grid item md={3}>
            <Box>
                <Box sx={{display : 'flex'}}>     
                            <Rating name="read-only" value={avg} precision={0.1} readOnly></Rating>
                    
                    <Typography sx={{fontWeight : 'bold',
                                    p : '0.1rem'
                }}>
                        {avg} out of 5
                    </Typography>
                    
                </Box>
                <Typography sx={{color :'#585b5b'}}>
                    {ratings.length} global ratings
                </Typography>
                <Divider sx={{p: '1rem'}}></Divider>
                <Box>
                    <Typography sx={{fontWeight: 'bold',
                    fontSize : {xs:'1.3rem',sm:'1.5rem'},
                    p : '0.5rem',
                    pb : '0rem'
                    }}>
                        Review this product
                    </Typography>
                    <Typography>
                        Share your thoughts with other customers
                    </Typography>
                    <FormDialog></FormDialog>
                </Box>
                <Divider sx={{p: '1rem'}}></Divider>
            </Box>
            </Grid>
            <Grid item md={8}>
                <Box>
                    <Typography sx={{fontWeight: 'bold',
                                    fontSize : {xs:'1.5rem',sm:'2rem'}
                }}>
                        Customer Reviews
                    </Typography>
                        {ratings.map((rating)=> {
                            return <Box key={rating._id} sx={{pt: '1rem'}}>
                                <Box sx={{display : 'flex'}}>
                                    <AccountCircleIcon></AccountCircleIcon>
                                    <Typography>
                                        {rating.username}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Rating name="read-only" value={rating.rating} precision={1} readOnly></Rating>
                                </Box>
                                <Box>
                                    <Typography>
                                        Reviewed on {rating.date}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography sx={{padding: '0.5rem'}}>
                                        {rating.comment}
                                    </Typography>
                                </Box>
                                <Divider></Divider>
                            </Box>
                        })}                
                </Box>
            </Grid> 
        </Grid>
        <Box>
        </Box>
        
    </Box>
}