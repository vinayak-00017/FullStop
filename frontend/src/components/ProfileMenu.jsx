import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { admin } from '../store/selectors/admin';
import { user } from '../store/selectors/user';

export default function BasicMenu() {
    const adminname = useRecoilValue(admin)
    const username = useRecoilValue(user)
    const navigate = useNavigate() 
    const [title, setTitle] = React.useState('sign in')

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
    setAnchorEl(null)
    navigate('/login')
  }

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <AccountCircleIcon></AccountCircleIcon>
        <Typography sx={{display: {xs:'none',sm:'block'}}}>{title}</Typography>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
}