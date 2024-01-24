import { Box, Button, Grid } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import { BASE_URL } from "../../config"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

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

    return <Box sx={{m : '5rem',
    }}>  
            <Grid container spacing={2}>
                <Grid item md={3} >
                <strong>ID</strong>
                </Grid>
                <Grid item md={4}>
                <strong>Product Name</strong>
                </Grid>
                <Grid item md={2}>
                <strong>Category</strong>
                </Grid>
                <Grid item md={3}>
                <strong>Actions</strong>
                </Grid>
            </Grid>   
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
            <Grid item md={4}>
                {product.productName}
            </Grid>
            <Grid item md={2}>
                {product.category}
            </Grid>
            <Grid item md={3}>
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