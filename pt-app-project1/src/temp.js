import React, { useReducer, useEffect, useState } from "react";
import './App.css';

import CustomerList from './components/CustomerList'

import TrainingList from './components/TrainingList'

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/Button';
import MoreVertIcon from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


function App() {

  const printLog = data => console.log(data);

  const[value, setValue] = useState('one');
  
  const [showHideCustomers, setShowHideCustomers] = React.useState(true);
  const [showHideTrainings, setShowHideTrainings] = React.useState(false);
  const [showHideCalendar, setShowHideCalendar] = React.useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
 
  const styles_hr = {
    height: .5,
    color: '#000000',
    backgroundColor: '#000000',
    borderColor:'#A2A2A2',
    margin:10
  };

  const handleClick = (event) => {
    printLog();
    console.log("handleClick");
    setAnchorEl(event.currentTarget);
    console.log(anchorEl);
  };

  const handleClose = (event, value) => {
    console.log("handleClick: value");
    setValue(value);
    console.log(value);
    setAnchorEl(event.currentTarget);
    console.log("handleClick: anchorEl");
    console.log(anchorEl);
  };

  return (
    <div className='App'>
      {/*
      App bar container
      */}
      <AppBar position="static">
        <Toolbar>
          <IconButton
            id="IconButton"
            color="inherit"
            aria-label="menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MenuIcon />
            <MoreVertIcon />
          </IconButton>
          
          <Typography variant="h6">
            React project: Personal Trainer app
          </Typography>
          {/*
            Navigation container
          */}
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem value="one" onClick={handleClose}>Customers</MenuItem>
            <MenuItem value="two" onClick={handleClose}>Trainings</MenuItem>
            <MenuItem value="three" onClick={handleClose}>Calendar</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      
      {/*
      Main container for personal trainer project.
      View is changed based on navigation selections.
      */}
      {console.log(anchorEl)}
      {value=== 'one'&& <div>Customers</div>}
      {value=== 'two'&& <div>Trainings</div>}
      {value=== 'three'&& <div>Calendar</div>}
      <hr  style={styles_hr}/>

      {anchorEl=== 'Customers'&& <div>Show CustomerList<hr  style={styles_hr}/> <CustomerList /></div>}
      {anchorEl=== 'Trainings'&& <div>Show TrainingList<hr  style={styles_hr}/> <TrainingList /></div>}
      {anchorEl=== 'Trainings'&& <div>Show TrainingList<hr  style={styles_hr}/> <TrainingList /></div>}
      
      <hr  style={styles_hr}/>

      <TrainingList />
    </div>
  );
}

export default App;
