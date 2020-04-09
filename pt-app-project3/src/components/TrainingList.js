import React, { useState, useEffect} from 'react';

import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import * as moment from 'moment';
import 'moment/locale/fi';

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
        setOpen(false);
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
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
            id: 'date',
            Header: 'Date',
            width: 150,
            accessor: (row) => <span>
                {moment(row.date).local().subtract(9, 'h').subtract(30, 'm').format('DD.MM.YYYY')} 
                <br />
                {moment(row.date).local().subtract(9, 'h').subtract(30, 'm').format('HH:mm a')}
            </span>
        },
        {
            Header: 'duration',
            accessor: 'duration',
            width: 150
        },
        {
            Header: 'activity',
            accessor: 'activity',
            width: 250
        },
        {
            Header: 'Customer',
            accessor: 'customer',
            Cell     : row => <span>
                {row.original.customer.firstname} {row.original.customer.lastname}
                </span>,
            width: 350
        },
        /*{
            Header: 'Update',
            sortable: false,
            filterable: false,
            width: 100,
        },*/
        {
            id: 'col_del',
            Header: 'Delete',
            sortable: false,
            filterable: false,
            width: 120,
            accessor: (row) => "https://customerrest.herokuapp.com/api/trainings/" + row.id,
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
            id: 'link',
            Header: 'link',
            sortable: false,
            filterable: false,
            accessor: (row) => "https://customerrest.herokuapp.com/api/trainings/" + row.id,
            style: { 'whiteSpace': 'unset' } // allow for words wrap inside only this cell
        }
    ]

    return (
    <div>

      

      <ReactTable 
        data={trainings} 
        columns={columns} 
        filterable={true}
        defaultPageSize={8}
      />
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