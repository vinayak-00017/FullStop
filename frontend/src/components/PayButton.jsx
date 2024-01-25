import {Button} from '@mui/material'
import { useRecoilValue } from 'recoil'
import { cart } from '../store/selectors/cart'
import axios from 'axios'
import { BASE_URL } from '../config'
import { user } from '../store/selectors/user'
import { useNavigate } from 'react-router-dom'


export const PayButton = () => {
    const navigate = useNavigate()
    const sCart = useRecoilValue(cart)
    const username = useRecoilValue(user)

    const handleCheckout = async() => {
        const response = await axios.post(`${BASE_URL}/stripe/create-checkout-session`,{
            sCart,username
        })
        if(response.data.url){
            window.location.href = response.data.url
        }
    }

    return (
        <>
            <Button onClick={()=> handleCheckout()}>Check Out</Button>
        </>
    )
}