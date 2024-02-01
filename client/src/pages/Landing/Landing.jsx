import { useCallback, useEffect ,useState } from "react";
import React  from "react";
import axios from 'axios';
import {BASE_URL} from '../../config' 
import { Box ,Button,CircularProgress,Grid, Paper, Rating, Typography} from "@mui/material"
import { useNavigate } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
import Carousel from 'react-material-ui-carousel'
import { useRecoilValue } from "recoil";
import { productsState } from "../../store/atoms/products";
import ReactPaginate from 'react-paginate';
import "./pagination.css"
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


const Landing = () => {
    const products = useRecoilValue(productsState)
    const navigate = useNavigate();

    const productsPerPage = 8
    const [itemOffset, setItemOffset] = useState(0);
    const endOffset = itemOffset + productsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    const currentItems = products.products.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(products.products.length / productsPerPage);
  
    const handlePageClick = (event) => {
      const newOffset = (event.selected * productsPerPage) % products.products.length;
      console.log(
        `User requested page number ${event.selected}, which is offset ${newOffset}`
      );
      setItemOffset(newOffset);
    };
  
    
    const handleClick = async(id) => {
        navigate('/product/'+id)
    }

    function shuffleArray(array) {
        const copy = [...array]; // Create a copy of the array
        for (let i = copy.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [copy[i], copy[j]] = [copy[j], copy[i]];
        }
        return copy; // Return the shuffled copy
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
            <Carousel animation="slide" interval={6000} indicators={false} changeOnFirstRender={true} >
                {
                    shuffleArray(products.products).map((item,i)=><Item key={i} item={item} navigate={navigate}></Item>)
                }
            </Carousel>
        </Box>
        <Typography sx={{fontSize:'3rem',pt:'3rem'}}>
            Latest Products
        </Typography>
        <Grid container spacing={6} sx={{mt:'1rem'}}>
       {shuffleArray(currentItems).map((product) => {
        return  <Grid key={product._id} item xs={12} sm = {6} md={4} lg = {3}>
                <RenderProducts product={product} handleClick = {handleClick}></RenderProducts>
            </Grid>     
       })}
       </Grid>
        <ReactPaginate
            breakLabel="..."
            className="paginate"
            nextLabel={<ArrowForwardIosIcon/>}
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel={<ArrowBackIosIcon/>}
            renderOnZeroPageCount={null}
            /> 
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



function Item({item,navigate})
{
    return (
        <Box sx={{display:"flex",justifyContent:'center'}} 
        onClick={() =>navigate(`/product/${item._id}`)}>
            <Box>
                <Box sx={{height:{xs:'5rem',sm:'10rem',md:'20rem'}}}>             
                    <img style={{height:'100%'}} 
                    src={item.imgLink} alt={item.productName} />
                </Box>
                <Box sx={{display:'flex',justifyContent:'center'}}>
                    <Typography sx={{fontSize:{xs:'1rem',sm:'1.5rem',md:'2rem'},pt:'2rem'}}>
                        {item.productName}
                    </Typography>
                </Box>
                <Box sx={{display : 'flex',justifyContent:'center'}}>
                    <Typography sx={{fontSize:{xs : '1.5rem', sm : '2rem'}}} >
                    ${(item.price - ((item.price * item.discount)/100)).toFixed(2) }    
                    </Typography>
                    {item.discount > 0 && <Box>
                    <Box sx={{display: 'flex'}}>
                        <Typography  color="text.secondary" sx={{fontSize:{xs : '0.1rem', sm : '1rem'}}}>
                        List :$
                        </Typography>
                        <Typography 
                                    style={{textDecoration : 'line-through'}} 
                                    color = 'text.secondary'
                        >
                            {item.price} 
                        </Typography>
                    </Box>
                        <Typography sx={{color : 'red'}} >
                            {item.discount}% off
                        </Typography>
                </Box>}
         </Box>     
            </Box>
        </Box>
    )
}

export default Landing;