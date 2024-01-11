import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { BASE_URL } from "../config"
import { Box, Container } from "@mui/material"


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

    return <Container 
    maxWidth="xxl"
    sx={{bgcolor:'tomato'}}>
        
        hi
    </Container>
}

export default ProductPage;