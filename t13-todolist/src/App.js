import React from 'react';
import logo from './logo.svg';
import './App.css';
import Todolist from './Todolist';



function App() {
  return (
    <>
    <link rel="stylesheet" 
      href="https://unpkg.com/purecss@1.0.1/build/pure-min.css" 
      integrity="sha384-oAOxQR6DkCoMliIh8yFnu25d7Eq/PHS21PClpwjOTeU2jRSq11vu66rf90/cZr47" 
      crossOrigin="anonymous"></link>
    <div className="App" >
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
      </header>
      
      <div >
        <h1 >TodoList</h1>
        <Todolist/>
      </div>
      
    </div>
    </>
  );
}

export default App;
