import { Box, Button, CircularProgress, TextField, Typography } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import {toast} from 'react-toastify'
import { BASE_URL } from "../../config"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { productsState } from "../../store/atoms/products"

export const CreateProduct = () => {

    const setProducts = useSetRecoilState(productsState)
    const products = useRecoilValue(productsState)
    const [productName,setProductName] = useState('')
    const [price,setPrice] = useState(0)
    const [imgLink,setImgLink] = useState('')
    const [description,setDescription] = useState('')
    const [discount,setDiscount] = useState(0)
    const [stock,setStock] = useState(0)
    const [category,setCategory] = useState('')
    const navigate = useNavigate()
    

    const handlePost = async() => {
        try{
            const product = {
                productName,
                price,
                imgLink,
                description,
                stock,
                category,
                discount 
            }
            const response = await axios.post(`${BASE_URL}/product/new`,product,{
                headers:{
                    authentication : localStorage.getItem('adminToken')
                }
            })
            if(response.status == 200){
                toast.success(response.data.message)
                navigate('/adminDashboard')
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
        width : '500px'
    }
      

    return<Box>
        <Box>
            <CircularProgress></CircularProgress>
        </Box>
     <Box sx={{
        display : 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        p: '3rem'
    }}>
        <Typography sx={{fontSize: '2.5rem',p : '1rem'}}>
            Create Product
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
            type="number"
            value={stock}
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
        <Button onClick={handlePost}
        variant="contained" sx={{mt: '2rem'}}>
            post
        </Button>
    </Box>
    </Box>
}