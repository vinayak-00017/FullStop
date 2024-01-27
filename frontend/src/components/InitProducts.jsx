import axios from "axios"
import { useEffect } from "react"
import { BASE_URL } from "../config"
import { useSetRecoilState } from "recoil"
import { productsState } from "../store/atoms/products"

export const InitProducts = () =>{
    
    const setProducts = useSetRecoilState(productsState)

    useEffect(()=>{
        const init = async() =>{
            try{
                const response = await axios.get(`${BASE_URL}/product/all`)
                setProducts({
                    isLoading : false,
                    products : response.data.products
                })
            }catch(err){
                console.error(err)
            }
        }
        init()
    },[])
}