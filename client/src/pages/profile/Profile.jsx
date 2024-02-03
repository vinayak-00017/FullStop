import { Box, Button, Card, IconButton, Paper, TextField, Typography} from "@mui/material"
import EditIcon from '@mui/icons-material/Edit';


export const Profile = () => {

       
    const fieldStyles = {
        width : {xs:'250px',sm:'350px',md:'500px'},
        my:'0.7rem'
    }
      

    return <Box sx={{display:'flex',justifyContent:'center',p:'3rem',backgroundColor:'#e3e6e6'}}>
        <Box sx={{ justifyContent:'center'}}>
            <img src="https://i.redd.it/jbkai89vwyja1.jpg"
            style={{ width: '15rem', height: '15rem', borderRadius:'50%', objectFit: 'cover' }}></img>
        </Box>
        <Box sx={{justifyContent:'center',m:'2rem'}}>
            <Card>
                <Paper elevation={5}>
                <Box sx={{display:'flex',flexDirection:'column',p:'2rem'}}>
                    <TextField variant='outlined'color='secondary' label="Username" value={"ea3y"}
                    sx={{...fieldStyles}}>
                    </TextField>
                    <TextField variant='outlined'color='secondary' label="Profile Picture"
                    sx={{...fieldStyles}}>
                    </TextField>
                    <TextField variant='outlined'color='secondary' label="Email"
                    sx={{...fieldStyles}}>
                    </TextField>
                    <TextField variant='outlined'color='secondary' label="Mobile no."
                    sx={{...fieldStyles}}>
                    </TextField>
                    <TextField variant='outlined'color='secondary' label="Name"
                    sx={{...fieldStyles}}>
                    </TextField>
                    <TextField variant='outlined'color='secondary' label="Home Address"
                    sx={{...fieldStyles}}>
                    </TextField>
                    <TextField variant='outlined'color='secondary' label="City"
                    sx={{...fieldStyles}}>
                    </TextField>
                    <TextField variant='outlined'color='secondary' label="Zip"
                    sx={{...fieldStyles}}>
                    </TextField>
                    <TextField variant='outlined'color='secondary' label="Country"
                    sx={{...fieldStyles}}>
                    </TextField>
                    <Button variant="contained" sx={{mt:'2rem'}}>
                        Update
                    </Button>
                </Box>
                </Paper>
            </Card>
        </Box>
    </Box>
}