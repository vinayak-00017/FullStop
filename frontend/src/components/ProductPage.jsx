import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { BASE_URL } from "../config"
import { Box, Container } from "@mui/material"
import { ProductDetails } from "./ProductDetails"


const ProductPage = () => {

    const [product,setProduct] = useState({})
    const {id} = useParams()

     const getProduct = async() => { 
            try {
                const response = await axios.get(`${BASE_URL}/product/single/${id}`)
                console.log(response.data.product)
                setProduct(response.data.product)
            }catch(err){
                console.error(err)
            }           
        }

    useEffect(()=> {
       
        getProduct();
    },[])

    return <Box
        sx={{bgcolor: 'tomato',
            padding : '3rem',
        }}
    >  
      <ProductDetails product = {product}></ProductDetails>
   </Box>
}

export default ProductPage;