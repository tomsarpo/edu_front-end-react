import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

export default function SimpleMenu() {
  const [value, setValue] = useState('one');
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleChange = (event, value) => {
    setValue(value);
    console.log("handleChange: value");
    console.log(value);
    
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event, value) => {
    setAnchorEl(null);
    console.log("handleClose: event.target.innerText");
    console.log(event.target.innerText);

    switch (event.target.innerText) {
      case "One":   return setValue("one");
      case "Two": return setValue("two");
      case "Three":  return setValue("three");
      default:      return setValue(null);
    }

  };

  return (
    <div>
      <div>
        <AppBar position="static">
          <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
            Open Menu
          </Button>

          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            value={value}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>One</MenuItem>
            <MenuItem onClick={handleClose}>Two</MenuItem>
            <MenuItem onClick={handleClose}>Three</MenuItem>

          </Menu>

          <Tabs value={value} onChange={handleChange}>
            <Tab value="one" label="One" />
            <Tab value="two" label="Two" />
            <Tab value="three" label="Three" />
          </Tabs>
        </AppBar>
      </div>
      {value === 'one' && <div>Item One</div>}
      {value === 'two' && <div>Item Two</div>}
      {value === 'three' && <div>Item Three</div>}
    </div>
  );
}
