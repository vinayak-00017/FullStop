import { Box, Button, Grid, Typography } from "@mui/material"
import { useNavigate, useParams } from "react-router-dom"
import { useRecoilValue } from "recoil"
import { filteredProductsState } from "../store/selectors/productSearch"
import { searchState } from "../store/atoms/search"
import ProductCard from "../components/ProductCard"

export const SearchResults = () => {
    const products = useRecoilValue(filteredProductsState)
    const useSearch = useRecoilValue(searchState)
    const navigate = useNavigate()

    const handleClick =(id) =>{
        navigate(`/product/${id}`)
    }

    console.log(products)
    return<Box sx={{pl : {xs:'3rem',md:'6rem',lg:'8rem',xl:'12rem'},
                pr : {xs:'3rem',md:'6rem',lg:'8rem',xl:'12rem'},
                pt : {xs:'3rem'},
                }}>
            <Box>
                <Typography sx={{fontSize:{xs:'3rem',md:'5rem'}}}>
                    Results for "{useSearch}"
                </Typography>
            </Box>
            <Box sx={{mt: '5rem'}}>
            {products.length > 0 && useSearch ? (<Grid container spacing={6}>
                {products.map((product)=>{
                    return <Grid key={product._id} item xs={12} sm = {6} md={4} lg = {3}>
                        <Box  onClick = {() => handleClick(product._id)}
                        sx={{":hover":{cursor:'pointer'}}}>
                            <ProductCard product={product}></ProductCard>
                        </Box>
                    </Grid>
                })}
                </Grid>):(
                    <Box sx={{height: '100vh',
                                display: 'flex',
                                justifyContent: 'center',}}>
                        <Box>
                            <img src="/not_found.jpg"
                                style={{height:'60vh'}}></img>
                                <Box sx={{display:'flex',justifyContent:'center'}}>
                                <Typography sx={{fontSize: {xs:'2rem',md:'4rem'}}}>    
                                    nothing to show ...
                                </Typography>
                                </Box>
                                <Box sx={{display:"flex",justifyContent:'center'}}>
                                <Button onClick={()=>navigate('/')}>
                                    BACK TO HOME
                                </Button>
                                </Box>
                        </Box>
                        
                    </Box>
                )}
            </Box>
    </Box>
}