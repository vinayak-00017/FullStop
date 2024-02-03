import { Box, Button, Card, Paper, TextField, Typography } from "@mui/material"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useRecoilState } from "recoil"
import { addressState } from "../../store/atoms/address"

export const Shipping =()=>{

    const [address,setAddress] = useRecoilState(addressState)
    const navigate = useNavigate()
    const [showError, setShowError] = useState(false);

    const handleClick = () =>{
        if(address.houseAddress && address.city && address.zip && address.country && address.mobileNumber && address.name){
            navigate('/order')
        }else{
            setShowError(true)
        }
    }


    return<Box sx={{display:"flex",
                    flexDirection: 'column',
                    alignItems : 'center',
                    backgroundColor: '#e3e6e6',
                    height: '100vh'}}>
        <Card sx={{m:'3rem'}}>
            <Paper elevation={5}>
                <Box sx={{p:'2rem'}}>
                    <Typography sx={{fontSize:'2rem',fontWeight:'bold'}}>
                        SHIPPING
                    </Typography>
                    {showError && <Typography sx={{color:'red'}}>
                       *Please fill all fields</Typography>}
                    <Box sx={{my:'0.5rem'}}>
                        <Typography>
                            Name
                        </Typography>
                        <TextField variant="filled"  sx={{width:{xs:'250px',md:'600px'},}}
                            value={address.name}
                            onChange={(e)=>{setAddress({ ...address, name: e.target.value })}}
                        ></TextField>
                    </Box>
                    <Box sx={{my:'0.5rem'}}>
                        <Typography>
                            House Address
                        </Typography>
                        <TextField variant="filled"  sx={{width:{xs:'250px',md:'600px'}}}
                            value={address.houseAddress}
                            onChange={(e)=>{setAddress({ ...address, houseAddress: e.target.value })}}
                        ></TextField>
                    </Box>
                    <Box sx={{my:'0.5rem'}}>
                        <Typography>
                            City 
                        </Typography>
                        <TextField variant="filled" sx={{width:{xs:'250px',md:'600px'}}}
                            value={address.city}
                            onChange={(e)=>{setAddress({ ...address, city: e.target.value })}}
                        >
                        </TextField>
                    </Box>
                    <Box sx={{my:'0.5rem'}}>
                        <Typography>
                            Zip code 
                        </Typography>
                        <TextField variant="filled" sx={{width:{xs:'250px',md:'600px'}}}
                             value={address.zip}
                             onChange={(e)=>{setAddress({ ...address, zip: e.target.value })}}
                        >  
                        </TextField>
                    </Box>
                    <Box sx={{my:'0.5rem'}}>
                        <Typography>
                            Country
                        </Typography>
                        <TextField variant="filled" required sx={{width:{xs:'250px',md:'600px'}}}
                             value={address.country}
                             onChange={(e)=>{setAddress({ ...address, country: e.target.value })}}
                        >
                        </TextField>
                    </Box>
                    <Box sx={{my:'0.5rem'}}>
                        <Typography>
                            Mobile number
                        </Typography>
                        <TextField variant="filled" required sx={{width:{xs:'250px',md:'600px'}}}
                             value={address.mobileNumber}
                             onChange={(e)=>{setAddress({ ...address, mobileNumber: e.target.value })}}
                        >
                        </TextField>
                        <Typography sx={{fontSize:'0.7rem', ml:'1rem'}}>
                            May be used to assist delivery
                        </Typography>
                    </Box>
                    <Button variant="contained" sx={{
                        mt:'1rem',
                        borderRadius: '0px',
                        backgroundColor:'#131921',
                        p:'0.5rem 1rem'
                    }}
                    onClick={handleClick}
                    >
                        Proceed
                    </Button>
                </Box>
            </Paper>
        </Card> 
    </Box>
}