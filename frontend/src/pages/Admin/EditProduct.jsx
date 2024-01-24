import { Box } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import {toast} from 'react-toastify'
import { BASE_URL } from "../../config"

export const EditProduct = () => {

    const {id} = useParams()
    const [product,setProduct] = useState()
    const [loading,setLoading] = useState(true)

    useEffect(()=>{
        const getDetails = async() =>{
            try {
                const response = await axios.get(`${BASE_URL}/product/single/${id}`)
                setProduct(response.data.product)
                setLoading(false)
            }catch(err){
                console.error(err)
            }
        }    
        getDetails()
    },[])

    return <Box>
        edit
    </Box>
}