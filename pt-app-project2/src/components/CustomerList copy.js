import React, { useState, useEffect } from 'react';

import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

import AddCustomer from './AddCustomer'
import EditCustomer from './EditCustomer'
import AddTraining from './AddTraining'

export default function CustomerList() {
    const [customers, setCustomers] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [deleteItem, setDeleteItem] = React.useState("");
 
    useEffect(() => fetchData(), []);

    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => {
            return response.json();
          })
        .then(responseData => {
            console.log("customers - responseData");
            console.log(responseData);
            setCustomers(responseData.content);
            console.log("customers - responseData.content");
            console.log(responseData.content);
            console.log("customers - responseData.content[0].links[0].href");
            console.log(responseData.content[0].links[0].href);
          })
    }

    const deleteClick = (link) => {
        setOpen(true);
        setDeleteItem(link);
        console.log("deleteClick");
        console.log(link);
        console.log(deleteItem);
        return;
      };

    const delete_Customer = (link) => {
        console.log("delete_Customer");
        console.log(link);
        console.log(deleteItem);
        fetch(deleteItem, {method: 'DELETE'})
        .then(res => fetchData())
        .catch(err => console.error(err))
        setDeleteItem("");
        setOpen(false);
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
    }

    const save_Customer = (customer) => {
        fetch('https://customerrest.herokuapp.com/api/customers', {
            method: 'POST',
            headers:  {'Content-Type': 'application/json'},
            body:  JSON.stringify(customer)
        })
        .then(res => fetchData())
        .catch(err => console.error(err))
    }

    const update_Customer = (customer, link) => {
        fetch(link, {
            method: 'PUT',
            headers:  {'Content-Type': 'application/json'},
            body:  JSON.stringify(customer)
        })
        .then(res => fetchData())
        .catch(err => console.error(err))
    }

    const save_CustomerTraining = (training) => {
        fetch('https://customerrest.herokuapp.com/api/trainings', {
            method: 'POST',
            headers:  {'Content-Type': 'application/json'},
            body:  JSON.stringify(training)
        })
        .then(res => fetchData())
        .catch(err => console.error(err))
    }
  
    const columns = [
        {
            Header: 'First name',
            accessor: 'firstname'
        },
        {
            Header: 'Last name',
            accessor: 'lastname'
        },
        {
            Header: 'Street address',
            accessor: 'streetaddress'
        },
        {
            Header: 'Postcode',
            accessor: 'postcode'
        },
        {
            Header: 'City',
            accessor: 'city'
        },
        {
            Header: 'Email',
            accessor: 'email'
        },
        {
            Header: 'Phone',
            accessor: 'phone'
        },
        {
            Header: 'Update',
            sortable: false,
            filterable: false,
            width: 70,
            Cell: row => <EditCustomer customer={row.original} updateCustomerProp={update_Customer} />
        },
        {
            id: 'col_del',
            Header: 'Delete',
            sortable: false,
            filterable: false,
            width: 120,
            accessor: (row) => row.links[0].href,
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
            
        },
        {
            Header: 'Add Training',
            sortable: false,
            filterable: false,
            width: 140,
            Cell: row => <AddTraining customer={row.original} addCustomerTrainingProp={save_CustomerTraining} />
        },
        {
            id: 'link',
            Header: 'link',
            sortable: false,
            filterable: false,
            accessor: (row) => row.links[0].href,
            style: { 'white-space': 'unset' } // allow for words wrap inside only this cell
        }
    ]

    return (
    <div>
      <AddCustomer saveCustomerProp={save_Customer}/>

      <ReactTable data={customers} columns={columns} filterable={true} />
      <Snackbar
            anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
            }}
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            message="About to delete customer. Are you sure?"
            action={
            <React.Fragment>
                <Button color="secondary" size="small" onClick={delete_Customer}>
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