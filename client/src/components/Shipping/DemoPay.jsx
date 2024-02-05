import { Box, Button, Divider } from "@mui/material"
import EngineeringIcon from '@mui/icons-material/Engineering';
import { useRecoilValue } from "recoil";
import { cart } from "../../store/selectors/cart";
import { cartTotalPrice } from "../../store/selectors/cartTotalPrice";
import { addressState } from "../../store/atoms/address";
import axios from "axios";
import { BASE_URL } from "../../config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const DemoPay = () =>{

    const navigate = useNavigate()
    const sCart = useRecoilValue(cart).map((item)=>({                
        id : item.item._id,
        quantity : item.quantity,
        size : item.size           
    })) 
    const total = useRecoilValue(cartTotalPrice)
    const address = useRecoilValue(addressState)

    const handleClick = async() => { 
        try{
            const response = await axios.post(`${BASE_URL}/user/demo`,{
                sCart,
                total,
                name : address.name,
                houseAddress : address.houseAddress,
                city : address.city,
                country : address.country,
                mobileNumber : address.mobileNumber,
                zip: address.zip
            },{
                headers: {
                    authentication : localStorage.getItem('token')
                }
            })
            console.log(response.data)
            toast.success('order placed!')
            navigate('/')
        }catch(err){
            console.error(err)
        }
    }

    return<Box sx={{display:'flex',justifyContent:'center',my:'1rem'}}>
        <Button onClick={handleClick} 
        variant="contained" sx={{
            backgroundColor: '#005028',
            color: 'white',
            width: '100%',
            borderRadius:'0.3rem',
            height:'3rem'
        }}>
            <EngineeringIcon></EngineeringIcon>
            Pay as tester
        </Button>
    </Box>
}