import { useCallback, useEffect ,useState } from "react";
import React  from "react";
import axios from 'axios';
import {BASE_URL} from '../config' 
import { Box ,Button,CircularProgress,Grid, Paper, Rating, Typography} from "@mui/material"
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import Carousel from 'react-material-ui-carousel'
import { useRecoilValue } from "recoil";
import { productsState } from "../store/atoms/products";

const Landing = () => {

    const products = useRecoilValue(productsState)
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(0);
    
    const handleClick = async(id) => {
        navigate('/product/'+id)
    }

    return<Box>
    {products.isLoading? (
        <Box sx={{display : 'flex' ,justifyContent : 'center' , alignItems:'center', width : '100%',height:'100vh'}}>
         <CircularProgress color="secondary"/>
        </Box>
    ) : (<Box sx={{pl : {xs:'3rem',md:'6rem',lg:'8rem',xl:'12rem'},
                    pr : {xs:'3rem',md:'6rem',lg:'8rem',xl:'12rem'},
                    pt : {xs:'3rem'},
    }}>
        <Box >
            <Carousel animation="slide" interval={60000} indicators={false}>
                {
                    products.products.map((item,i)=><Item key={i} item={item}></Item>)
                }
            </Carousel>
        </Box>
        <Typography sx={{fontSize:'4rem',p:'2rem'}}>
            Latest Products
        </Typography>
        <Grid container spacing={6}>
       {products.products.map((product) => {
        return  <Grid key={product._id} item xs={12} sm = {6} md={4} lg = {3}>
                <RenderProducts product={product} handleClick = {handleClick}></RenderProducts>
            </Grid>     
       })}
       </Grid>
    </Box>)
    }
    </Box>
}

function RenderProducts({product,handleClick}){
    return <Box  onClick = {() => handleClick(product._id)}
                sx={{":hover":{cursor:'pointer'}}}
    >
        <ProductCard product= {product}></ProductCard>
    </Box>
}

function Item({item})
{
    return (
        <Box sx={{display:"flex",justifyContent:'center'}}>
            <Box>
                <Box>             
                    <img style={{height:'20rem'}} 
                    src={item.imgLink} alt={item.productName} />
                </Box>
                <Box sx={{display:'flex',justifyContent:'center'}}>
                    <Typography sx={{fontSize:'2rem',p:'2rem'}}>
                        {item.productName}
                    </Typography>
                </Box>
                <Box>

                </Box>
            </Box>
           
            {/* <Box>
            <h2 >{item.productName}</h2>
            <Box sx={{display: 'flex'}}>       
                <Typography sx={{p: '0.1rem',fontWeight:'bold'}}>{5}</Typography>
                <Rating name="read-only" value={5} precision={0.1} readOnly />
                <Typography 
                    sx={{p:'0.1rem',pl:'1rem',fontWeight:'bold',color:'teal',cursor:'pointer'}}>
                {`(${item.ratings.length})`}</Typography>
            </Box>
            <Box sx={{display : 'flex',
                            pt : '2rem'
                }}>
                   {item.discount > 0 &&  <Typography sx={{color : 'red',
                                        fontSize : {xs : '1rem',sm : '1.5rem',md : '1.8rem',lg : '2rem'},
                                        fontWeight : 'bold'    
                    }}
                        >-{item.discount}%</Typography>}
                        <Typography 
                        sx={{fontSize : {xs : '2rem', sm : '2.5rem', md : '2.5rem' , lg : '3.5rem'}}}>
                            ${(item.price-(item.discount*item.price)/100).toFixed(2)}
                            </Typography>
                    </Box>
                    {item.discount > 0 &&<Box sx={{display : 'flex',
                                fontSize : {xs : '0.7rem',sm : '1rem',md : '1.2rem',lg : '1.5rem'},
                                color: '#6b6e77'
                }}>
                        <Typography variant="h7">List Price : $</Typography>
                        <Typography variant="h7" sx={{textDecoration : 'line-through'}}>{item.price}</Typography>
                    </Box>}
            </Box>

            <Button className="CheckButton">
                Check it out!
            </Button> */}
        </Box>
    )
}

export default Landing;