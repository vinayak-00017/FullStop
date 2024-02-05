import { Box, Button, Card, IconButton, Paper, TextField, Typography} from "@mui/material"
import { useState } from "react";

export const ProfileCard = ({email,setEmail,name,setName,mobileNumber,setMobileNumber
                            ,profilePicture,setProfilePicture,houseAddress,setHouseAddress,city,setCity,
                            zip,setZip,country, setCountry, updateProfile,username
}) =>{

    const [warning,setWarning] = useState(false)

    const fieldStyles = {
        width : {xs:'250px',sm:'350px',md:'500px'},
        my:'0.7rem'
    }
      

    return <Box sx={{display:'flex',justifyContent:'center',
                    p:{xs:'1rem',md:'3rem'},
                    backgroundColor:'#e3e6e6',
                    flexDirection:{xs:'column',md:'row'}}}>
    <Box sx={{ display:'flex',justifyContent:'center',mb:'2rem'}}>
        <img src={profilePicture}
        style={{ width: '15rem', height: '15rem', borderRadius:'50%', objectFit: 'cover' }}></img>
    </Box>
    <Box sx={{display:"flex",justifyContent:'center',m:{xs:'0rem',md:'2rem'}}}>
        <Card>
            <Paper elevation={5}>
            <Box sx={{display:'flex',flexDirection:'column',p:'2rem'}}>
                {warning && <Typography sx={{color:'red'}}>
                    *Cannot edit username </Typography>}
                <TextField variant='outlined'color='secondary' label="Username"
                 value={username}
                 onClick={()=>setWarning(true)}    
                sx={{...fieldStyles}}>
                </TextField>

                <TextField variant='outlined'color='secondary' label="Profile Picture"
                onChange={(e)=>setProfilePicture(e.target.value)} 
                value={profilePicture}
                sx={{...fieldStyles}}>
                </TextField>

                <TextField variant='outlined'color='secondary' label="Email"
                onChange={(e)=>setEmail(e.target.value)} 
                value={email}
                sx={{...fieldStyles}}>
                </TextField>

                <TextField variant='outlined'color='secondary' label="Mobile no."
                onChange={(e)=>setMobileNumber(e.target.value)} 
                value={mobileNumber}
                sx={{...fieldStyles}}>
                </TextField>

                <TextField variant='outlined'color='secondary' label="Name"
                onChange={(e)=>setName(e.target.value)} 
                value={name}
                sx={{...fieldStyles}}>
                </TextField>

                <TextField variant='outlined'color='secondary' label="House Address"
                onChange={(e)=>setHouseAddress(e.target.value)} 
                value={houseAddress}
                sx={{...fieldStyles}}>
                </TextField>

                <TextField variant='outlined'color='secondary' label="City"
                value={city}
                onChange={(e)=>setCity(e.target.value)} 
                sx={{...fieldStyles}}>
                </TextField>

                <TextField variant='outlined'color='secondary' label="Zip"
                onChange={(e)=>setZip(e.target.value)} 
                value={zip}
                sx={{...fieldStyles}}>
                </TextField>

                <TextField variant='outlined'color='secondary' label="Country"
                onChange={(e)=>setCountry(e.target.value)} 
                value={country}
                sx={{...fieldStyles}}>
                </TextField>
                <Button variant="contained" sx={{mt:'2rem'}}
                onClick={()=>updateProfile()}
                >
                    Update
                </Button>
            </Box>
            </Paper>
        </Card>
    </Box>
</Box>
}