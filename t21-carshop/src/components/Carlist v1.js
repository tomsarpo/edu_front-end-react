import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';



export default function Carlist() {
    const [cars, setCars] = useState([]);

    useEffect(() => fetchData(), []);

    const fetchData = () => {
        fetch('https://carstockrest.herokuapp.com/cars')
        .then(response => response.json())
        .then(responseData => setCars(responseData._embedded.cars))
    }

    const deleteCar = (link) => {
        console.log(link);
        if (window.confirm('Are you sure?')){
            fetch(link, {method: 'DELETE'})
            .then(res => fetchData())
            .catch(err => console.log(err))
        }
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
            Header: 'Actions',
            sortable: false,
            filterable: false,
            width: 100,
            accessor: '_links.self.href',
            Cell: row => 
            <Button
                onClick={ () => deleteCar(row.value)}
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
      <ReactTable data={cars} columns={columns} filterable={true}/>
    </div>
  )
  
}