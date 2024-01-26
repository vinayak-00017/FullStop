import axios from "axios"
import { BASE_URL } from "../config"


export const DemoUser = async() => {
    let response = null
        try{
                response = await axios.post(`${BASE_URL}/user/login`,{
                    username : 'test',
                    password : 'test'
                })
            }catch(err){
                console.error(err)
            }
        
    return response.data.message
}