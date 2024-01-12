import { useEffect ,useState } from "react";
import React  from "react";
import axios from 'axios';
import {BASE_URL} from '../config' 
import { Box ,Grid} from "@mui/material"
import { useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";

const Landing = () => {

    const [products,setProducts] = useState([])
    const navigate = useNavigate();

    useEffect(()=>{
        const getProducts = async() => {
            try {
                const response = await axios.get(`${BASE_URL}/product/all`)
                console.log(response.data.products)
                setProducts(response.data.products)
            }catch(err){
                console.error(err)
            }           
        }
        getProducts();
    },[])
    
    const handleClick = async(id) => {
        navigate('/product/'+id)
    }

    return <>
        <Grid container spacing={2}>
       {products.map((product) => {
        return  <Grid item xs={12} sm = {6}  lg = {4}>
                <RenderProducts product={product} handleClick = {handleClick}></RenderProducts>
            </Grid>     
       })}
       </Grid>
    </>
}

function RenderProducts({product,handleClick}){
    return <Box onClick = {() => handleClick(product._id)}
                sx={{":hover":{cursor:'pointer'}}}
    >
        <ProductCard product= {product}></ProductCard>
    </Box>
}

export default Landing;