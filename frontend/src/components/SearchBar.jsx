import { TextField } from '@mui/material';


export const SearchBar = () => {
    return(
        <TextField variant="outlined"
        placeholder="Search for products, brands and more"
        sx={{width : { xs:'10=rem',sm:'15rem',md:'26rem',lg:'35rem'},
            // display: {xs : 'none', sm : 'block'}
    }}
    InputProps={{
        style: {
            color: 'white'
        }                      
        }}
/>                                 
    )
}