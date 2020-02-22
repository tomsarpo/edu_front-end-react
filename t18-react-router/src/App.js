import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Navigator from './navigator.js';
import Home from './Home.js';
import About from './About.js';
import Contact from './Contact.js';
import logo from './logo.svg';
import './App.css';

function App() {
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
            React App demo - React router
          </p>
        </header>

        <BrowserRouter>
        <div>
          <Navigator />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/about" component={About} />
              <Route path="/contact" component={Contact} />
              <Route render={() => <h1>Page not found</h1>} />
            </Switch>
        </div>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
