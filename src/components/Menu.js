import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from "react-router-dom";

export default function SimpleMenu({loggedIn}) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        <MenuIcon className='menuIcon'/>
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}><Link to="/" className='routeLinks'>Home</Link></MenuItem>
        <MenuItem onClick={handleClose}><Link to="/Products" className='Products'>Products</Link></MenuItem>
        {loggedIn ? <MenuItem onClick={handleClose}><Link to="/Cart" className='routeLinks'>My Cart</Link></MenuItem> : ''}
        
      </Menu>
    </div>
  );
}