import React, { useState } from "react";

export default function TodoInputForm(props) {
  const [descInput, setDescInput] = useState("");
  const [dateInput, setDateInput] = useState('');
  const { handleAddTodo } = props;

  return (
    <form className="pure-form " 
      onSubmit={e => {
        handleAddTodo({ 
            index: new Date().getTime(), 
            desc: descInput,
            date: dateInput
        });
      }}>
      <fieldset>
        <legend>Add a todo item:</legend>
        Description: &nbsp;
        <input type="text" placeholder="Description" onChange={e => {
            setDescInput(e.target.value);
          }} value={descInput}/> &nbsp;
        Date: &nbsp;
        <input type="date" onChange={e => {
            setDateInput(e.target.value);
          }} value={dateInput}/> &nbsp;
        &nbsp;
        <button type="submit" className="pure-button pure-button-primary">Add</button>      
      </fieldset>
    </form>
  );
}
