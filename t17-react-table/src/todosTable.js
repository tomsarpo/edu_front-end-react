import React, { useState } from "react";
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";

export default function TodosTable(props) {
  const { todoTable, handleRemoveItem } = props;
  const columns= 
  [
    {
      Header:'ID',
      accessor: 'index'
    },{
      Header:'Date',
      accessor: 'date'
    },{
      Header:'Description',
      accessor: 'desc',
    },{
      Header: "Actions",
      id:'delete',
      accessor: str => "delete",

      Cell: (todo_row)=> (
        <button name={todo_row.index} className="pure-button pure-button-primary" onClick={() => {
          console.log(props.todoTable[todo_row.index]);
          props.handleRemoveItem(todo_row.index);
        }} >Delete</button>
      )   
    }
  ];
    
  return (
    <>
      <ReactTable data={props.todoTable}
          columns={columns} sortable='true' 
          defaultPageSize='10'/>
    </>
  );
}
