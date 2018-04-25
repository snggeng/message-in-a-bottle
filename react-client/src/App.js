import React, { Component } from 'react';
import './App.css';
import { Grid } from 'semantic-ui-react'
import SceneContainer from './Scene'
import AppContainer from './AppContainer'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bottleSelected: false,
      bottleId: undefined
    };
  }

  handleBottleSelect = (e) => {
    console.log('selected', e.target.id)
    this.setState({
      bottleSelected: true,
      bottleId: e.target.id
    })
  }


  render() {
    return (
      <div className="App">
        <Grid divided='vertically'>
          <Grid.Row columns={2}>
            <Grid.Column>
              <SceneContainer handleBottleSelect={this.handleBottleSelect} />
            </Grid.Column>
            <Grid.Column>
              <AppContainer bottleId={this.state.bottleId} bottleSelected={this.state.bottleSelected} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default App;
