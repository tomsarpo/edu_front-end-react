import React, { useReducer, useEffect, useState } from "react";
import logo from './logo.svg';
import './App.css';

import TodosTable from "./todosTable.js";
import TodoInputForm from "./todoInputForm.js";

function App() {
 
  const [todos, dispatch] = useReducer((state_todos, action) => {
    if (action.type === "add") {
      if (state_todos) {

        state_todos = [...state_todos, action.value]; 
        setTimeout(() => {
          console.log("added");
        }, 4000);
      }
      else state_todos = [action.value];
    } else if (action.type === "remove") {
      const newTodos = state_todos.filter(todo => todo.index !== action.value);
      state_todos = [...newTodos];
    }

    localStorage.setItem("todos", JSON.stringify(state_todos));
    return state_todos;
  }, JSON.parse(localStorage.getItem("todos")) || 
    [
      {
          index: 0,
          desc: "Do something",
          date: "2020-02-19"
      },
      {
          index: 1,
          desc: "Do something new",
          date: "2020-02-19"
      },
      {
          index: 2,
          desc: "Do more",
          date: "2020-02-19"
      }
    ]
  );

  useEffect(() => {
    setTimeout(() => {
      console.log("welcome");
    }, 4000);
  }, []);

  useEffect(() => {
    document.title = `${todos.length} Todos`;
    return () => {
      localStorage.removeItem("todos");
    };
  }, [todos]);

  const handleRemoveItem = index => {
    dispatch({ type: "remove", value: index });
  };

  const handleAddTodo = todo => {
    dispatch({ type: "add", value: todo });
  };


  return (
    <>
      <link rel="stylesheet" 
        href="https://unpkg.com/purecss@1.0.1/build/pure-min.css" 
        integrity="sha384-oAOxQR6DkCoMliIh8yFnu25d7Eq/PHS21PClpwjOTeU2jRSq11vu66rf90/cZr47" 
        crossOrigin="anonymous">
      </link>

      <div className={"App"}>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
        </header>

        <h1>React Todo App React</h1>
        <div>
          <TodoInputForm handleAddTodo={handleAddTodo} />
        </div>
        <div>
          <TodosTable todoTable={todos} handleRemoveItem={handleRemoveItem} />
        </div>
      </div>
    </>
  );
}

export default App;
