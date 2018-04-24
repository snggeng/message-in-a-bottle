import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SceneContainer from './Scene'
import { Grid } from 'semantic-ui-react'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {color: 'red'};
  }

  changeColor() {
    const colors = ['red', 'orange', 'yellow', 'green', 'blue'];
    this.setState({
      color: colors[Math.floor(Math.random() * colors.length)]
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
      <Grid divided='vertically'>
        <Grid.Row columns={2}>
          <Grid.Column>
            <SceneContainer className="flex"/>
          </Grid.Column>
          <Grid.Column>
            <div className="flex">IN THE MIDDLE</div>
          </Grid.Column>
        </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default App;
