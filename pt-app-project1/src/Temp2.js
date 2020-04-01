import React, { useState} from 'react';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

export default function SimpleMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [value, setValue] = React.useState('one');

  const handleClick = (event, value) => {
    setAnchorEl(event.currentTarget);
    console.log("handleClick: value");
    console.log(value);
  };

  const handleClose = (event, value) => {
    setAnchorEl(null);
    console.log("handleClose: value");
    console.log(value);
    handleChange(value);
  };

  const handleChange = (value) => {
    setValue(value);
    console.log("handleChange: value");
    console.log(value);
  };

  return (
    <div>
      <AppBar position="static">
        
      
        <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
          Open Menu
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          value={value}
          onClose={handleClose}
        >
          <MenuItem value="one" onClick={handleClose}>Customers</MenuItem>
          <MenuItem value="two" onClick={handleClose}>Trainings</MenuItem>
          <MenuItem value="three" onClick={handleClose}>Calendar</MenuItem>
        </Menu>

        <Tabs value={value} onChange={handleChange}>
          <Tab value="one" label="Item One" />
          <Tab value="two" label="Item Two" />
          <Tab value="three" label="Item Three" />
        </Tabs>
      </AppBar>
      {value=== 'one'&& <div>Item One</div>}
      {value=== 'two'&& <div>Item Two</div>}
      {value=== 'three'&& <div>Item Three</div>}
    </div>
  );
}