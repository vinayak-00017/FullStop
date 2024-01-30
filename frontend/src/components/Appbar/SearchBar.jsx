import { Backdrop, Box, TextField } from '@mui/material';
import {  useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { searchState } from '../../store/atoms/search';
import { filteredProductsState } from '../../store/selectors/productSearch';


export const SearchBar = () => {

    const navigate = useNavigate()
    const setSearch = useSetRecoilState(searchState)
    const useSearch = useRecoilValue(searchState)
    const filtredProducts = useRecoilValue(filteredProductsState)
    const [isClicked, setIsClicked] = useState(false);

    const handleSubmit = () => {
        setIsClicked(false)
        navigate(`/search/`)
    }

    const handleClick = (id) => {
        window.location.href = `/product/${id}`
    }

    return<Box >
        <Box sx={{display:'flex'}}>
            <Box>
            <TextField variant="outlined"
                placeholder="Search for products, brands and more"
                value={useSearch}
                onChange={(e)=>
                    // setKeyword(e.target.value)
                    setSearch(e.target.value)
                }
                onFocus={()=>setIsClicked(true)}
                onBlur={()=>setTimeout(() => setIsClicked(false), 150)}
                onKeyDown={(e)=>{
                    if(e.key === 'Enter'){
                        handleSubmit()
                    }
                }}
                sx={{width : { xs:'18rem',sm:'15rem',md:'26rem',lg:'35rem'},
                zIndex: 3
            }}
            InputProps={{
                style: {
                    color: 'white'
                }                      
            }}/>  
            
    </Box>     
    <Box sx={{zIndex:2}}>
        <SearchIcon onClick = {handleSubmit}
        sx={{fontSize : {xs:'3rem',sm: '3rem'},
                        color : 'white'
        }}></SearchIcon>
    </Box> 
    </Box>  
    {isClicked && useSearch && (filtredProducts.length > 0) && <Box sx={{position: 'absolute',
                backgroundColor: 'white',
                width: {xs:'300px',md:'450px',lg:'550px'},
                height: 'auto',
                maxHeight: '300px',
                overflow: 'hidden',
                overflowY: 'auto',
                boxShadow: 'rgba(0,0,0,0.35) 0px 5px 15px',
                zIndex: 3
}}>
        {filtredProducts.map((value,key)=>{
            return <Box key={key} sx={{width : '100%'
                            , zIndex: 3
                            ,height : '50px',
                            display: 'flex',
                            alignItems: 'center',
                            color: 'black',
                            p: '0.5rem',
                            '&:hover': {
                                backgroundColor: 'lightgray', // Change this to the desired highlight color
                              },
                            cursor: 'pointer'
            }}
            onClick ={()=> handleClick(value._id)}
            >
                {value.productName}
            </Box>
        })}
    </Box> }    
    <Backdrop open={isClicked} style={{ color: '#fff', zIndex: 2 }}>
</Backdrop>                 
</Box>

}
