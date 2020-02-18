import React from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  constructor(props) {
      super(props);

      this.state = {
          firstname: "John",
          lastname: "Williams"
      };

      this.messages = this.messages.bind(this);
  }

  messages() {
    alert("Hello " + this.state.firstname + " " + this.state.lastname);
  }

  render() {
    return (
      <>
      <div>
        First name
        <input type="text" value={this.state.firstname} />
      </div>
      <div>
        Last name
        <input type="text" value={this.state.lastname} />
      </div>
      <div>
        <button onClick={this.messages}>Send</button>
      </div>
      </>
    );
  }
}

export default App;
