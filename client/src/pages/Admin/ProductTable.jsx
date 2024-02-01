import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Typography } from "@mui/material"
import axios from "axios";
import React from "react";
import { toast } from "react-toastify";
import { BASE_URL } from "../../config";


export const ProductTable = ({product,handleEdit}) =>{

    const [open, setOpen] = React.useState(false);
   
    const handleClose = () => {
        setOpen(false);
      };
      
    const handleClickOpen =() =>{
        setOpen(true)
    }


    const handleDelete = async(id) => {
        try{
            const response = await axios.delete(`${BASE_URL}/product/delete/${id}`,{
                headers:{
                    authentication : localStorage.getItem('adminToken')
                }
            })
            setOpen(false)
            toast.info(response.data.message)
        }catch(err){
            console.error(err)
        }
    }


    return < Box> 
    <Grid container spacing={2}>
            <Grid item md={3} >
                {product._id}           
            </Grid>
            <Grid item md={5}>
                {product.productName}
            </Grid>
            <Grid item md={2}>
                {product.category.map((c)=>{return c+`,`})}
            </Grid>
            <Grid item md={2}>
                <Box>
                    <Button onClick={() => handleEdit(product._id)}>
                        edit
                    </Button>
                    <Button onClick={handleClickOpen}>
                        Delete
                    </Button>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
                        <DialogContent>
                        <DialogContentText id="alert-dialog-description" component='div'>
                            Are you sure you want to delete this product?
                            <Box sx={{fontWeight:'bolder'}}>
                                "{product.productName}"
                            </Box> 
                        </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={handleClose} >
                            Cancel
                        </Button>
                        <Button onClick={() => handleDelete(product._id)}  autoFocus>
                            Delete
                        </Button>
                        </DialogActions>
                    </Dialog>
                </Box>
            </Grid>
        </Grid>
        </Box>
}