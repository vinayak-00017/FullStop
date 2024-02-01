import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import { BASE_URL } from "../../config"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import EditNoteIcon from '@mui/icons-material/EditNote';
import { useRecoilValue } from "recoil"
import { adminState } from "../../store/atoms/admin"
import { productsState } from "../../store/atoms/products"
import { ProductTable } from "./ProductTable"

export const AdminDashboard = () =>{

    const products = useRecoilValue(productsState)
    const navigate = useNavigate()
    const admin = useRecoilValue(adminState)


    useEffect(()=>{      
        if(!admin.isAdmin && !admin.isLoading){
            navigate('/')
        }
    },[admin,navigate])


    if(admin.isLoading){
        return <Box sx={{display : 'flex' ,justifyContent : 'center' , alignItems:'center', width : '100%',height:'100vh'}}>
            <CircularProgress color="secondary"></CircularProgress>
        </Box>
    }


    const handleEdit = (id) => {
        navigate(`/editProduct/${id}`)
    }

    const handleCreate = () => {
        navigate(`/createProduct`)
    }


    return <Box sx={{ml : '5rem', mr: '5rem'
    }}>  
    <Box sx={{display: 'flex', 
            justifyContent: 'space-between',    
            p: '1.5rem'}}>
        <Typography sx={{ fontSize: '3rem'}}>
            Products
        </Typography>
        <Button variant="contained" onClick={ handleCreate}>
            <EditNoteIcon></EditNoteIcon>
            Create Product
        </Button>
    </Box>
        <Box sx={{p: '2rem'}}>
            <Grid container spacing={2}>
                <Grid item md={3} >
                <strong>ID</strong>
                </Grid>
                <Grid item md={5}>
                <strong>Product Name</strong>
                </Grid>
                <Grid item md={2}>
                <strong>Category</strong>
                </Grid>
                <Grid item md={2}>
                <strong>Actions</strong>
                </Grid>
            </Grid>   
        </Box>    
            {products.products.map(product => {
                return <Box key = {product._id} sx={{p : '2rem'}} >
                <ProductTable product={product} handleEdit={handleEdit}></ProductTable>
                </Box>
            })}
    </Box>
}


