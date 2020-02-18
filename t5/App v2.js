import React from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';

{/* A JSX comment */}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        name_from_input: "John",
        age: 20
    };

    this.messages = this.messages.bind(this);

    const {isMessageActive} = this.state;
  }

  messages() {
    this.setState({ isMessageActive: false });
    this.messages = "--------------"

    if (this.state.age >= 18) {
      this.setState({ isMessageActive: true });
      this.messages = "Hello " + this.state.name_from_input;
      
    } else {
      this.setState({ isMessageActive: true });
      this.messages = "You are too young";
      {/* this.messages = this.state.name_from_input + " " + this.state.age + "....You are too young";*/}
    }
    
    {/* alert(this.messages); */}
    alert(this.messages);    
  }

  render() {
    if(this.state.age >= 18) 
    {
      return (
        <>
        <div>
          {this.isMessageActive}
          <p isMessageActive>Text: {this.messages} {this.state.messages}</p>
        </div>
        <div>
          <p>Text: {this.messages}</p>
        </div>
        <div>
          <p>Text: {this.state.messages}</p>
        </div>
        <div>
          First name
          <input type="text" value={this.state.name_from_input} />
        </div>
        <div>
          Age
          <input value={this.state.age} onChange={event => this.setState({age: event.target.value.replace(/\D/,'')})}/>
        </div>
        <div>
          <button onClick={this.messages}>Submit</button>
        </div>
        </>
      );
    }
    
    
  }
}

export default App;
