
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../config";
import { ProfileCard } from "../../components/ProfileCard";
import { Box, CircularProgress } from "@mui/material";


export const Profile = () => {

    const [profilePicture, setProfilePicture] = useState('')
    const [houseAddress, setHouseAddress] = useState('')
    const [country, setCountry] = useState('')
    const [city, setCity] = useState('')
    const [zip, setZip] = useState('')
    const [mobileNumber, setMobileNumber] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const[username,setUsername] = useState('')
    const[loading,setLoading] = useState(true)

    useEffect(()=>{
        const getProfile = async() =>{
            try{
                const response = await axios.get(`${BASE_URL}/user/profile`,{
                    headers : {
                        authentication : localStorage.getItem('token')
                    }
                })
                console.log(response.data)
                setCity(response.data.address.city)
                setCountry(response.data.address.country)
                setName(response.data.address.name)
                setEmail(response.data.email)
                setZip(response.data.address.zip)
                setMobileNumber(response.data.mobileNumber)
                setProfilePicture(response.data.profilePicture)
                setHouseAddress(response.data.address.houseAddress)
                setUsername(response.data.username)
                setLoading(false)
            }catch(err){
                console.error(err)
            }
        } 
        getProfile()
    },[])
       

    const updateProfile = async() =>{
        try{
            const response = await axios.put(`${BASE_URL}/user/profile`,{
                email,
                mobileNumber,
                profilePicture,
                address : {
                    name,
                    houseAddress,
                    city,
                    country,
                    zip
                }
            },{
                headers:{
                    authentication : localStorage.getItem('token')
                }
            })
            console.log(response.data)
            setUpdated[updated+1]
        }catch(err){
            console.error(err)
        }
    }

    if(loading){
        return<Box sx={{display:'flex',justifyContent:"center",alignItems:'center',height:'80vh'}}>
            <CircularProgress color="secondary"></CircularProgress>
        </Box>
    }

    return <ProfileCard
            email= {email} setEmail={setEmail}
            name = {name} setName = {setName}
            city = {city} setCity={setCity}
            country= {country} setCountry = {setCountry}
            houseAddress={houseAddress} setHouseAddress={setHouseAddress}
            zip={zip} setZip={setZip}
            mobileNumber= {mobileNumber} setMobileNumber={setMobileNumber}
            profilePicture={profilePicture} setProfilePicture={setProfilePicture}
            updateProfile={updateProfile}
            username={username}
    ></ProfileCard>
}