import React, { Component } from 'react';
import {
    Router,
    Route,
    Redirect,
    withRouter,
    Link
  } from 'react-router-dom'
import { Container, Input, Menu, Icon, Header, Step, Segment, Button } from 'semantic-ui-react'
import Login from './Login/Login'
import UserView from './UserView'
import { logout, getUser } from './utils/auth'
import { url as server_url } from './utils/api'
import history from './history'
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

const AppHeader = (props) => (
    <div>
        <Header as='h2' icon textAlign='center'>
            <Icon name='users' circular />
            <h1 className={'title'}>Message In A Bottle</h1>
            <Header.Content>
                {/* <p>{props.bottleSelected ? props.bottleId : 'no bottle selected'}</p> */}
                <p>Find messages others have left behind in our webVR ocean on the left.</p>
            </Header.Content>
        </Header>
        <Segment raised>
            <Step.Group fluid>
                <Step>
                <Icon name='mouse pointer' />
                <Step.Content>
                    <Step.Title>Pick</Step.Title>
                    <Step.Description>Choose your bottle</Step.Description>
                </Step.Content>
                </Step>

                <Step>
                <Icon name='binoculars' />
                <Step.Content>
                    <Step.Title>View</Step.Title>
                    <Step.Description>Read messages in the bottle</Step.Description>
                </Step.Content>
                </Step>

                <Step>
                <Icon name='compose' />
                <Step.Content>
                    <Step.Title>Leave A Message</Step.Title>
                    <Step.Description>Write something meaningful</Step.Description>
                </Step.Content>
                </Step>
            </Step.Group>
            <Segment className={'header-instructions'}>
            <h2>{'Use the '}
                <code className={'bordered-key'}>W</code>
                <code className={'bordered-key'}>A</code> 
                <code className={'bordered-key'}>S</code>
                <code className={'bordered-key'}>D</code>
                {' keys or '} 
                <Icon name='arrow left' bordered />
                <Icon name='arrow right' bordered />
                <Icon name='arrow up' bordered />
                <Icon name='arrow down' bordered />
                {' arrow keys to move around the ocean.'}</h2>
            <h2>{'Alternatively, '} 
                <Button animated inverted color='teal'>
                    <Button.Content visible>Login</Button.Content>
                    <Button.Content hidden>
                        <Icon name='right arrow' />
                    </Button.Content>
                </Button>
                {' or '}
                <Button animated='vertical' inverted color='teal'>
                    <Button.Content visible>Sign Up</Button.Content>
                    <Button.Content hidden>
                        <Icon name='user' />
                    </Button.Content>
                </Button>
            {' to create your own.'}</h2>
            </Segment>
        </Segment>
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

  handleLogin = (e, { name }) => {
      this.setState({ activeItem: name })
  }
  handleLogout = (e, { name }) => {
      this.setState({ activeItem: name })
      logout()
      this.toggleAuth(false)
  }

  render () {
    const { activeItem } = this.state
    return (
        <div>
            <Container style={{paddingRight:'2rem', height: '100vh'}}>
                <Router history={history}>
                    <div>
                    <Menu pointing secondary>
                        <Menu.Item name='home' active={activeItem === 'home'} onClick={this.handleItemClick} />
                        <Menu.Item name='about' active={activeItem === 'about'} onClick={this.handleItemClick} />
                        <Menu.Item name='bottles' active={activeItem === 'bottles'} onClick={this.handleItemClick} />
                        <Menu.Menu position='right'>
                        <Menu.Item name={this.state.isAuthenticated ? 'logout' : 'login'} active={this.state.isAuthenticated ? activeItem === 'logout': activeItem === 'login'} onClick={this.state.isAuthenticated ? this.handleLogout : this.handleLogin}>
                        {this.state.isAuthenticated ? (<Link to={'/'}>{'logout'}</Link>) : (<Link to={'/login'}>{'login'}</Link>)}
                        </Menu.Item>
                        </Menu.Menu>
                    </Menu>
                    <Route exact path="/" render={
                        (props) => (<AppHeader {...props}
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
