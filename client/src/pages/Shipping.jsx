import { Box, Button, Card, Paper, TextField, Typography } from "@mui/material"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const Shipping =()=>{

    const [houseAddress,setHouseAddress] = useState('')
    const [name,setName] = useState('')
    const [city,setCity] = useState('')
    const [zip,setZip] = useState('')
    const [country,setCountry] = useState('')
    const [mNumber,setMNumber] = useState('')
    const navigate = useNavigate()
    const [showError, setShowError] = useState(false);

    const handleClick = () =>{
        if(houseAddress && city && zip && country && mNumber && name){
            navigate('/order',{state: { houseAddress,city,zip,country}})
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
                        <TextField variant="filled"  sx={{width:'600px',}}
                            value={name}
                            onChange={(e)=>{setName(e.target.value)}}
                        ></TextField>
                    </Box>
                    <Box sx={{my:'0.5rem'}}>
                        <Typography>
                            House Address
                        </Typography>
                        <TextField variant="filled"  sx={{width:'600px',}}
                            value={houseAddress}
                            onChange={(e)=>{setHouseAddress(e.target.value)}}
                        ></TextField>
                    </Box>
                    <Box sx={{my:'0.5rem'}}>
                        <Typography>
                            City 
                        </Typography>
                        <TextField variant="filled" sx={{width:'600px'}}
                            value={city}
                            onChange={(e)=>{setCity(e.target.value)}}
                        >
                        </TextField>
                    </Box>
                    <Box sx={{my:'0.5rem'}}>
                        <Typography>
                            Zip code 
                        </Typography>
                        <TextField variant="filled" sx={{width:'600px'}}
                             value={zip}
                             onChange={(e)=>{setZip(e.target.value)}}
                        >  
                        </TextField>
                    </Box>
                    <Box sx={{my:'0.5rem'}}>
                        <Typography>
                            Country
                        </Typography>
                        <TextField variant="filled" required sx={{width:'600px'}}
                             value={country}
                             onChange={(e)=>{setCountry(e.target.value)}}
                        >
                        </TextField>
                    </Box>
                    <Box sx={{my:'0.5rem'}}>
                        <Typography>
                            Mobile number
                        </Typography>
                        <TextField variant="filled" required sx={{width:'600px'}}
                             value={mNumber}
                             onChange={(e)=>{setMNumber(e.target.value)}}
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