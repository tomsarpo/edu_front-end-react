import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';


import CustomerList from './components/CustomerList'
import TrainingList from './components/TrainingList'

export default function PTAppMain() {
  const [value, setValue] = useState('one');
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event, value) => {
    setAnchorEl(null);
    console.log("handleClose: event.target.innerText");
    console.log(event.target.innerText);

    switch (event.target.innerText) {
      case "Customers":   return setValue(1);
      case "Trainings": return setValue(2);
      case "Calendar":  return setValue(3);
      default:      return setValue(null);
    }

  };

  const styles_hr = {
    height: .5,
    color: '#000000',
    backgroundColor: '#000000',
    borderColor:'#A2A2A2',
    margin:10
  };

  return (
    <div className='App'>
      {/*
      App bar container
      */}
      <AppBar position="static">
        <Toolbar>
          {/*
            Navigation container
          */}
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleClick}>
            <MenuIcon />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            value={value}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Customers</MenuItem>
            <MenuItem onClick={handleClose}>Trainings</MenuItem>
            <MenuItem onClick={handleClose}>Calendar</MenuItem>
          </Menu>
          {/*
            Title container
          */}
          <Typography variant="h6">
            React project: Personal Trainer app
          </Typography>
        </Toolbar>
      </AppBar>

      {/*
      Main container for personal trainer project.
      View is changed based on navigation selections.
      */}
      <Container maxWidth="lg">
        <div> &nbsp; </div>
        
        {value === 1 && <div><CustomerList /></div>}
        {value === 2 && <div><TrainingList /></div>}
        {value === 3 && <div>Show Calendar</div>}

        <hr  style={styles_hr}/>
        
      </Container>
    </div>
  );
}
