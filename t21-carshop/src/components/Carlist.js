import React, { useState, useEffect } from 'react';

import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

import Addcar from './Addcar'
import Editcar from './Editcar'

export default function Carlist() {
    const [cars, setCars] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [deleteItem, setDeleteItem] = React.useState("");

    useEffect(() => fetchData(), []);

    const fetchData = () => {
        fetch('https://carstockrest.herokuapp.com/cars')
        .then(response => response.json())
        .then(responseData => setCars(responseData._embedded.cars))
    }

    const deleteClick = (link) => {
        setOpen(true);
        setDeleteItem(link);
        console.log("deleteClick");
        console.log(deleteItem);
        return;
      };

    const deleteCar = (link) => {
        console.log("deleteCar");
        console.log(link);
        console.log(deleteItem);
        fetch(deleteItem, {method: 'DELETE'})
        .then(res => fetchData())
        .catch(err => console.error(err))
        setDeleteItem("");
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
    }

    const saveCar = (car) => {
        fetch('https://carstockrest.herokuapp.com/cars', {
            method: 'POST',
            headers:  {'Content-Type': 'application/json'},
            body:  JSON.stringify(car)
        })
        .then(res => fetchData())
        .catch(err => console.error(err))
    }

    const updateCar = (car, link) => {
        fetch(link, {
            method: 'PUT',
            headers:  {'Content-Type': 'application/json'},
            body:  JSON.stringify(car)
        })
        .then(res => fetchData())
        .catch(err => console.error(err))
    }
  
    const columns = [
        {
            Header: 'Brand',
            accessor: 'brand'
        },
        {
            Header: 'Model',
            accessor: 'model'
        },
        {
            Header: 'Color',
            accessor: 'color'
        },
        {
            Header: 'Fuel',
            accessor: 'fuel'
        },
        {
            Header: 'Year',
            accessor: 'year'
        },
        {
            Header: 'Price',
            accessor: 'price'
        },
        {
            sortable: false,
            filterable: false,
            width: 100,
            Cell: row => <Editcar car={row.original} updateCar={updateCar} />
        },
        {
            sortable: false,
            filterable: false,
            width: 100,
            accessor: '_links.self.href',
            Cell: row => 
            <Button
                onClick={ () => deleteClick(row.value)}
                size="small"
                variant="contained"
                color="secondary"
                startIcon={<DeleteIcon />}
            >
                Delete
            </Button>
        }
    ]

    return (
    <div>
      <Addcar saveCarProp={saveCar}/>
      <ReactTable data={cars} columns={columns} filterable={true}/>
      <Snackbar
            anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
            }}
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            message="About to delete car. Are you sure?"
            action={
            <React.Fragment>
                <Button color="secondary" size="small" onClick={deleteCar}>
                Proceed
                </Button>
                <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                <CloseIcon fontSize="small" />
                </IconButton>
            </React.Fragment>
            }
        />
    </div>
  )
  
}