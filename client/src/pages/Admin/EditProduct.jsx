import { Box, Button, CircularProgress, TextField, Typography } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import {toast} from 'react-toastify'
import { BASE_URL } from "../../config"

export const EditProduct = () => {

    const {id} = useParams()
    const [product,setProduct] = useState()
    const [loading,setLoading] = useState(true)
    const [productName,setProductName] = useState()
    const [price,setPrice] = useState()
    const [imgLink,setImgLink] = useState()
    const [description,setDescription] = useState()
    const [discount,setDiscount] = useState()
    const [stock,setStock] = useState()
    const [category,setCategory] = useState()
    const navigate = useNavigate()
    
    useEffect(()=>{
        const getDetails = async() =>{
            try {
                const response = await axios.get(`${BASE_URL}/product/single/${id}`)
                setProduct(response.data.product)
                setProductName(response.data.product.productName)
                setPrice(response.data.product.price)
                setImgLink(response.data.product.imgLink)
                setDescription(response.data.product.description)
                setDiscount(response.data.product.discount)
                setStock(response.data.product.stock)
                setCategory(response.data.product.category.join(','))
                setLoading(false)
      
            }catch(err){
                console.error(err)
            }
        }    
        getDetails()
    },[])

    const handleUpdate = async() => {
        try{
            const response = await axios.put(`${BASE_URL}/product/update/${id}`,{
               productName,
               price,
               imgLink,
               description,
               stock,
               discount 
            },{
                headers:{
                    authentication : localStorage.getItem('adminToken')
                }
            })
            if(response.status == 200){
                toast.success(response.data.message)
                navigate('/admin-dashboard')
                window.location.reload()
            }
        }catch(err){
            console.error(err)
        }
    }

    const boxStyles = {
        display: "flex",
        p: '0.5rem',
        // Add more styles here...
      };
    
    const fieldStyles = {
        width : {xs:'250px',sm:'350px',md:'500px'}
    }
      

    return<Box>
        {loading ? (<Box>
            <CircularProgress></CircularProgress>
        </Box>)
     :(<Box sx={{
        display : 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        p: {xs:'1rem',md:'3rem'}
    }}>
        <Typography sx={{fontSize: {xs:'2rem',md:'2.5rem'},p : '1rem'}}>
            Edit Product
        </Typography>
        <Box sx={{...boxStyles}}>
            <Typography sx={{p: '1rem'}}>
                Name:
            </Typography>
            <TextField 
            color="secondary"
            value={productName}
            onChange={(e)=>setProductName(e.target.value)}
            sx={{...fieldStyles}}
            />    
        </Box>
        <Box sx={{...boxStyles}}>
            <Typography sx={{p: '1rem'}}>
                Description:
            </Typography>
            <TextField 
            color="secondary"
            onChange={(e)=> setDescription(e.target.value)}
            value={description}
            sx={{...fieldStyles}}
            />    
        </Box>
        <Box sx={{...boxStyles}}>
            <Typography sx={{p: '1rem'}}>
                Category:
            </Typography>
            <TextField 
            color="secondary"
            onChange={(e)=> setCategory(e.target.value)}
            value={category}
            sx={{...fieldStyles}}
            />    
        </Box>
        <Box sx={{...boxStyles}}>
            <Typography sx={{p: '1rem'}}>
                Price:
            </Typography>
            <TextField 
            color="secondary"
            type="number"
            value={price}
            onChange={(e)=>setPrice(Number(e.target.value))}
            sx={{...fieldStyles}}
            />    
        </Box>
        <Box sx={{...boxStyles}}>
            <Typography sx={{p: '1rem'}}>
                Discount:
            </Typography>
            <TextField 
            color="secondary"
            type="number"
            value={discount}
            onChange={(e)=>setDiscount(Number(e.target.value))}
            sx={{...fieldStyles}}
            />    
        </Box>
        <Box sx={{...boxStyles}}>
            <Typography sx={{p: '1rem'}}>
                stock:
            </Typography>
            <TextField 
            color="secondary"
            value={stock}
            type="number"
            onChange={(e)=>setStock(Number(e.target.value))}
            sx={{...fieldStyles}}   
            />    
        </Box>
        <Box sx={{...boxStyles}}>
            <Typography sx={{p: '1rem'}}>
                imgLink:
            </Typography>
            <TextField 
            color="secondary"
            value={imgLink}
            onChange={(e)=>setImgLink(e.target.value)}
            sx={{...fieldStyles}}
            />    
        </Box>
        <Button onClick={handleUpdate}
        variant="contained" sx={{mt: '2rem'}}>
            Update
        </Button>
    </Box>)}
    </Box>
}