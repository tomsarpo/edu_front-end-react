import React from "react";

export default function Todo(props) {
  const { index, desc, date, handleRemoveItem } = props;
  return (
    <tr className="todo">
      <td key={index}>{index}</td>
      <td>{desc}</td>
      <td>{date}</td>
      <td><button name={index} onClick={() => handleRemoveItem(index)} className="pure-button pure-button-primary">Delete</button></td>
    </tr>
  );
}
