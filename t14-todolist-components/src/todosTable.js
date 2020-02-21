import React, { useState } from "react";
import Todo from "./todo.js";

export default function TodosTable(props) {
  const { todoTable, handleRemoveItem } = props;
    
  return (
    <table className="pure-table pure-table-horizontal">
      <thead>
          <tr><th>Id</th><th>Description</th><th>Date</th><th>Actions</th></tr> 
      </thead>
      <tbody> 
        {todoTable.map(todo => (
          <Todo {...todo} handleRemoveItem={() => { handleRemoveItem(todo.index); }} key={todo.index}
          />
        ))}
      </tbody>
    </table>
  );
}
