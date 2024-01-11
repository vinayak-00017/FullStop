import { useEffect ,useState } from "react";
import React  from "react";
import axios from 'axios';
import {BASE_URL} from '../config' 
import { Box } from "@mui/material"
import { useNavigate } from "react-router-dom";

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
       {products.map((product) => {
        return <RenderProducts product={product} handleClick = {handleClick}></RenderProducts>
       })}
    </>
}

function RenderProducts({product,handleClick}){
    return <Box onClick = {handleClick(product._id)}>
        {product.productName}
    </Box>
}

export default Landing;