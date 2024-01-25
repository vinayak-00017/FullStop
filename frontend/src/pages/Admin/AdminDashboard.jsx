import { Box, Button, Grid, Typography } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import { BASE_URL } from "../../config"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import EditNoteIcon from '@mui/icons-material/EditNote';

export const AdminDashboard = () =>{

    const [products,setProducts] = useState([])
    const navigate = useNavigate()

    useEffect(() =>{
        const getProducts = async() =>{
            try{
                const response = await axios.get(`${BASE_URL}/product/all`)
                setProducts(response.data.products)
            }catch(err){
                console.error(err)
            }
        }
        getProducts()
    },[])


    const handleDelete = () => {

    }

    const handleEdit = (id) => {
        toast.success("nice")
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
            {products.map(product => {
                return <Box key = {product._id} sx={{p : '2rem'}} >
                <ProductTable product={product} handleDelete={handleDelete} handleEdit={handleEdit}></ProductTable>
                </Box>
            })}
    </Box>
}


const ProductTable = ({product,handleDelete,handleEdit}) =>{
    return < Box> 
    <Grid container spacing={2}>
            <Grid item md={3} >
                {product._id}           
            </Grid>
            <Grid item md={5}>
                {product.productName}
            </Grid>
            <Grid item md={2}>
                {product.category}
            </Grid>
            <Grid item md={2}>
                <Box>
                    <Button onClick={() => handleEdit(product._id)}>
                        edit
                    </Button>
                    <Button onClick={() => handleDelete}>
                        Delete
                    </Button>
                </Box>
            </Grid>
        </Grid>
        </Box>
}