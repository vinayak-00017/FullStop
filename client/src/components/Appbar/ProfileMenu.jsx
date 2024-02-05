import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Badge, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { admin } from '../../store/selectors/admin';
import { user } from '../../store/selectors/user';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { adminState } from '../../store/atoms/admin';
import { userState } from '../../store/atoms/user';

export default function BasicMenu() {
    const adminname = useRecoilValue(admin)
    const username = useRecoilValue(user)
    const navigate = useNavigate() 
    const [title, setTitle] = React.useState('user')
    const setAdmin = useSetRecoilState(adminState)
    const setUser = useSetRecoilState(userState)

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  React.useEffect(() => {
    if (adminname) {
      setTitle(adminname);
    }
    if(username){
        setTitle(username)
    }
  }, [adminname,username]);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () =>{
    localStorage.removeItem('token')
    localStorage.removeItem('adminToken')
    setAdmin({
      isAdmin: false
    })
    setUser({
      isUser: false
    })
    setAnchorEl(null)
    navigate('/login')
  }

  const handleProfile = () =>{
    navigate('/profile')
    handleClose()
  }

  return (
    <div>
      {/* <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <AccountCircleIcon></AccountCircleIcon>
        <Typography sx={{display: {xs:'none',md:'block'}}}>{title}</Typography>
        <ArrowDropDownIcon></ArrowDropDownIcon>
      </Button> */}
      <Badge color="secondary" 
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
                sx={{color: 'white',cursor: 'pointer',ml:'1rem'}} >
                   <AccountCircleIcon></AccountCircleIcon>
                   <Typography sx={{display: {xs:'none',md:'block'}}}>{title}</Typography>
                   <ArrowDropDownIcon></ArrowDropDownIcon>
               </Badge>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleProfile}>Profile</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
}