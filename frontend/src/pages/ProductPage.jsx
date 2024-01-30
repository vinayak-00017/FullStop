import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { BASE_URL } from "../config"
import { Box, CircularProgress, Container, Divider, Typography } from "@mui/material"
import { ProductDetails } from "../components/ProductPage/ProductDetails"
import { Reviews } from "../components/ProductPage/Reviews"


const ProductPage = () => {

    const [product,setProduct] = useState({})
    const [loading,setLoading] = useState(true)
    const [avgRating, setAvgRating] = useState(0)
    const {id} = useParams()

     const getProduct = async() => { 
            try {
                const response = await axios.get(`${BASE_URL}/product/single/${id}`)
                setProduct(response.data.product)
                if(response.data.ratingsAverage !== null){
                    setAvgRating(parseFloat(response.data.ratingsAverage.toFixed(1) ))
                }
                setLoading(false)
            }catch(err){
                console.error(err)
            }           
        }

    useEffect(()=> {
       
        getProduct();
    },[])

    return <Box>
        {loading ? (
        <Box sx={{display : 'flex' ,justifyContent : 'center' , alignItems:'center', width : '100%',height: '100vh'}}>
            <CircularProgress color="secondary"/>
            </Box>) :(
    <Box
        sx={{
            padding : {xs:'2rem',sm:'5rem'},
            pl: {lg:'8rem'},
            pr : {lg: '8rem'}
        }}
    >  
      <ProductDetails product = {product} avg = {avgRating}></ProductDetails> 
     
   <Box sx={{p : '2rem'}}>
   <Divider></Divider>
    <Typography sx={{fontWeight: 'bold',
                    fontSize : '1.5rem',
                    p : '0.5rem'
    }}>
        Product Desription
    </Typography>
    <Typography sx={{ p : '1rem'}}>
        {product.description}
    </Typography>
   </Box>
   <Box sx={{p : '2rem'}}>
    <Divider></Divider>
    <Reviews ratings={product.ratings} avg={avgRating}></Reviews>
   </Box>
   </Box>)}
   </Box>
}

export default ProductPage;