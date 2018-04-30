import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react'
import SceneContainer from './Scene'
import AppContainer from './AppContainer'
import { url as server_url } from './utils/api'
import './App.css';

const auth = { isAuthenticated: false }

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bottleSelected: false,
      bottleId: undefined,
      isAuthenticated: auth.isAuthenticated,
      bottles: undefined

    };
  }

  componentWillMount() {
    this.fetchData()
  }

  componentWillReceiveProps() {

  }

  toggleAuth = (isAuth) => {
    // toggle global variable
    auth.isAuthenticated = isAuth
    console.log('is auth', isAuth)
    this.setState(auth)
  }

  handleBottleSelect = (e) => {
    console.log('selected', e.target.id)
    this.setState({
      bottleSelected: true,
      bottleId: e.target.id
    })
  }

  fetchData = async () => {
    const response = await fetch(server_url + '/public/bottles', {
        method: 'get',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
    // console.log(response)
    const bottles = await response.json()
    // console.log(body)
    if (response.status !== 200) throw bottles
    console.log('all bottles', bottles)
    this.setState({ bottles })
    
  }

  render() {
    return (
      <div className="App">
        <Grid divided='vertically'>
          <Grid.Row columns={2}>
            <Grid.Column>
              <SceneContainer handleBottleSelect={this.handleBottleSelect} bottles={this.state.bottles} />
            </Grid.Column>
            <Grid.Column>
              <AppContainer bottleId={this.state.bottleId} 
                            bottleSelected={this.state.bottleSelected} 
                            toggleAuth={this.toggleAuth} 
                            isAuthenticated={this.state.isAuthenticated}/>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default App;
