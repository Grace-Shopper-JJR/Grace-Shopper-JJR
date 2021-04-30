import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import { Typography } from '@material-ui/core';

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from "react-router-dom";

const SimpleMenu = ({loggedIn}) => {
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
        <MenuItem onClick={handleClose}><Link to="/merchandise" className='Products'>Art</Link></MenuItem>
        <MenuItem onClick={handleClose}><Link to="/" className='routeLinks'>About Us</Link></MenuItem>
        {loggedIn ? <MenuItem onClick={handleClose}><Link to="/Cart" className='routeLinks'>My Cart</Link></MenuItem> : ''}
        
      </Menu>
    </div>
  );
}

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    padding: 10,
  },
  leftAlign: {
      marginRight: 'auto',
  }
});

const Navbar = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
      <Typography>
      <SimpleMenu />
      </Typography>
      <Typography className={classes.leftAlign} variant="h2" component="h2" >
        JJRt
      </Typography>
        <Tab label="Contemporary" 

        />
        <Tab label="Impressionism" 

        />
        <Tab label="Cubism" 

        />
        <Tab label="Post-Impressionalism" 

        />
        <Tab label="Popart" 

        />
        
      </Tabs>
    </Paper>
  );
}

export default Navbar;