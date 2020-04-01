import React, { useState, useEffect} from 'react';

import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

//import Addtraining from './Addtraining'

export default function TrainingList() {
    const [trainings, setTrainings] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [deleteItem, setDeleteItem] = React.useState("");

    useEffect(() => fetchData(), []);

    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => {
            return response.json();
          })
        .then(responseData => {
            console.log("trainings - responseData");
            console.log(responseData);
            setTrainings(responseData); //store trainings as raw object
            console.log("trainings - responseData");
            console.log(responseData);
          })
    }

    const deleteClick = (link) => {
        setOpen(true);
        setDeleteItem(link);
        console.log("deleteClick");
        console.log(deleteItem);
        return;
      };

    const delete_Training = (link) => {
        console.log("deletetraining");
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

    const save_Training = (training) => {
        fetch('https://customerrest.herokuapp.com/api/trainings', {
            method: 'POST',
            headers:  {'Content-Type': 'application/json'},
            body:  JSON.stringify(training)
        })
        .then(res => fetchData())
        .catch(err => console.error(err))
    }

    const update_Training = (training, link) => {
        fetch(link, {
            method: 'PUT',
            headers:  {'Content-Type': 'application/json'},
            body:  JSON.stringify(training)
        })
        .then(res => fetchData())
        .catch(err => console.error(err))
    }
  
    const columns = [
        {
            Header: 'Date',
            accessor: 'date'
        },
        {
            Header: 'duration',
            accessor: 'duration'
        },
        {
            Header: 'activity',
            accessor: 'activity'
        },
        {
            Header: 'Customer',
            accessor: 'customer',
            Cell     : row => <span>
                {row.original.customer.firstname} {row.original.customer.lastname}
                </span>
        },
        {
            Header: 'Update',
            sortable: false,
            filterable: false,
            width: 100,
            //Cell: row => <EditCustomer customer={row.original} updatecustomer={update_Customer} />
        },
        {
            Header: 'Delete',
            sortable: false,
            filterable: false,
            width: 100,
            /*accessor: '_links.self.href',
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
            */
        }
    ]

    return (
    <div>
      {/*

      <AddTraining saveTrainingProp={save_Training}/>

      */}
      

      <ReactTable data={trainings} columns={columns} filterable={true}/>
      <Snackbar
            anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
            }}
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            message="About to delete training. Are you sure?"
            action={
            <React.Fragment>
                <Button color="secondary" size="small" onClick={delete_Training}>
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