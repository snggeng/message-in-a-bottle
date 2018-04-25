import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Redirect,
  } from 'react-router-dom'
import { Container, Input, Menu } from 'semantic-ui-react'
import Login from './Login/Login'
import UserView from './UserView'
import { url as server_url } from './utils/api'
import './AppContainer.css';

// Private auth variable to be passed on to routes
const auth = { isAuthenticated: false }

// PrivateRoute component that redirects if not authenticated
const PrivateRoute = ({ component: Component, ...rest, isAuthenticated: isAuth, toggleAuth }) => (
  <Route path="/:id" {...rest} render={ props => (
    auth.isAuthenticated ? (
      <Component isAuthenticated={isAuth} toggleAuth={toggleAuth} />
    ) : (
      <Redirect to={{
        pathname: '/',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

const Header = (props) => (
    <div>
        <h1 className={'title'}>Message In A Bottle</h1>
        <p>{props.bottleSelected ? props.bottleId : 'no bottle selected'}</p>

        <p>Find messages others have left behind in our webVR ocean on the left.</p>
        <p>Alternatively, create your own.</p>
    </div>
)

class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
        activeItem: 'home',
        isAuthenticated: auth.isAuthenticated 
    }
  }

  fetchData = () => {

  }

  toggleAuth = (isAuth) => {
    // toggle global variable
    auth.isAuthenticated = isAuth
    this.setState(auth)
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render () {
    const { activeItem } = this.state
    return (
        <div>
            <Container style={{paddingRight:'2rem', height: '100vh'}}>
             <Menu pointing secondary>
                <Menu.Item className={'title'} name='home' active={activeItem === 'home'} onClick={this.handleItemClick} />
                <Menu.Item className={'title'} name='about' active={activeItem === 'about'} onClick={this.handleItemClick} />
                <Menu.Item className={'title'} name='bottles' active={activeItem === 'bottles'} onClick={this.handleItemClick} />
                <Menu.Menu position='right'>
                {/* <Menu.Item>
                    <Input icon='search' placeholder='Search...' />
                </Menu.Item> */}
                <Menu.Item className={'title'} name='logout' active={activeItem === 'logout'} onClick={this.handleItemClick} />
                </Menu.Menu>
            </Menu>
                <Router>
                    <div>
                    <Route exact path="/" render={
                        (props) => (<Header {...props}
                                            isAuthenticated={this.state.isAuthenticated}
                                            toggleAuth={this.toggleAuth} />)
                        }/>
                        <Route exact path="/login" render={
                        (props) => (<Login {...props}
                                            isAuthenticated={this.state.isAuthenticated}
                                            toggleAuth={this.toggleAuth} />)
                        }/>
                        <PrivateRoute path="/user"
                                    component={UserView}
                                    isAuthenticated={this.state.isAuthenticated}
                                    toggleAuth={this.toggleAuth}/>
                    </div>
                </Router>
            </Container>
        </div>
    );
  }
}

export default AppContainer
