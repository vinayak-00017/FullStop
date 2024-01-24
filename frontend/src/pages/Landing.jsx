import { useEffect ,useState } from "react";
import React  from "react";
import axios from 'axios';
import {BASE_URL} from '../config' 
import { Box ,CircularProgress,Grid} from "@mui/material"
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const Landing = () => {

    const [products,setProducts] = useState([])
    const [loading,setLoading] = useState(true)
    const navigate = useNavigate();

    useEffect(()=>{
        const getProducts = async() => {
            try {
                const response = await axios.get(`${BASE_URL}/product/all`)
                setProducts(response.data.products)
                setLoading(false)
            }catch(err){
                console.error(err)
            }           
        }
        getProducts();
    },[])
    
    const handleClick = async(id) => {
        navigate('/product/'+id)
    }

    return<Box>
    {loading? (
        <Box sx={{display : 'flex' ,justifyContent : 'center' , alignItems:'center', width : '100%',height: '60vh'}}>
         <CircularProgress color="secondary"/>
        </Box>
    ) : (<Box sx={{pl : 10,
                    pr : 10,
                    pt : 5,
    }}>
        <Grid container spacing={6}>
       {products.map((product) => {
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

export default Landing;