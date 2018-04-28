import React, { Component } from 'react';
import {
    Router,
    Route,
    Redirect,
    withRouter,
    Link
  } from 'react-router-dom'
import { getUser, decodeToken, logout } from './utils/auth'
import { Container, Input, Menu, Icon, Header, Step, Segment, Button } from 'semantic-ui-react'
import Login from './Login/Login'
import UserView from './UserView'
import { url as server_url } from './utils/api'
import history from './history'
import './AppContainer.css';

// Private auth variable to be passed on to routes
// const auth = { isAuthenticated: false }

// PrivateRoute component that redirects if not authenticated
const PrivateRoute = ({ component: Component, ...rest, isAuthenticated: isAuth, toggleAuth }) => (
  <Route path="/:id" {...rest} render={ props => (
    isAuth ? (
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
            <div className={'title'}>Message In A Bottle</div>
            <Header.Content>
                {/* <p>{props.bottleSelected ? props.bottleId : 'no bottle selected'}</p> */}
                <p>Find messages others have left behind in our WebVR ocean on the left.</p>
            </Header.Content>
        </Header>
        <Segment raised>
            {/* <Step.Group fluid>
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
            </Step.Group> */}
            <Segment className={'header-instructions'}>
            <h2 style={{lineHeight: 2.2}}>{'Use the '}
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
                <Link to={'/login'}>
                    <Button animated inverted color='teal'>
                        <Button.Content visible>Login</Button.Content>
                        <Button.Content hidden>
                            <Icon name='right arrow' />
                        </Button.Content>
                    </Button>
                </Link>
                {' or '}
                <Link to={'/signup'}>
                    <Button animated='vertical' inverted color='teal'>
                        <Button.Content visible>Sign Up</Button.Content>
                        <Button.Content hidden>
                            <Icon name='user' />
                        </Button.Content>
                    </Button>
                </Link>
            {' to create your own.'}</h2>
            </Segment>
        </Segment>
    </div>
)

class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
        activeItem: 'home'
    }
  }

  componentWillReceiveProps(){
    // redirect user
    this.props.isAuthenticated ? 
    history.push('/user') : 
    this.state.activeItem === 'login' ? 
        history.push('/login') :
        history.push('/')
  }

  componentWillMount() {
    // Validate if token is expired and redirect user accordingly
    let jwt = window.sessionStorage.getItem('token')
    if (jwt) {
      let token = decodeToken()
      const current_time = (Date.now().valueOf() / 1000) // get UTC time
      // TODO: option to refresh tokens on expiry
      if (token.exp < current_time) {
        console.log('token expired')
        // prompt user to login again
        // showToast('error', 'Your token has expired. Please login again.', null)
      } else {
        // if user is logged in, do not redirect to dashboard on logout
        this.props.toggleAuth(true)
        // populate req.user so logs can access user
        fetch(server_url + '/public/refresh', {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': jwt
          }
        })
      }
    }
  }

  fetchData = () => {

  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  handleLogin = (e, { name }) => {
      this.setState({ activeItem: name })
  }
  handleLogout = (e, { name }) => {
      this.setState({ activeItem: name })
      logout()
      this.props.toggleAuth(false)
  }

  render () {
    const { activeItem } = this.state
    return (
        <div>
            <Container style={{paddingRight:'2rem', height: '100vh'}}>
                <Router history={history}>
                    <div>
                    <Menu pointing secondary>
                        {/* <Menu.Item name='home' active={activeItem === 'home'} onClick={this.handleItemClick} />
                        <Menu.Item name='about' active={activeItem === 'about'} onClick={this.handleItemClick} />
                        <Menu.Item name='bottles' active={activeItem === 'bottles'} onClick={this.handleItemClick} /> */}
                        <Menu.Menu position='right'>
                        <Menu.Item name={this.props.isAuthenticated ? 'logout' : 'login'} active={this.props.isAuthenticated ? activeItem === 'logout': activeItem === 'login'} onClick={this.props.isAuthenticated ? this.handleLogout : this.handleLogin}>
                        {this.props.isAuthenticated ? (<Link to={'/'}>{'Logout'}</Link>) : (<Link to={'/login'}>{'Login'}</Link>)}
                        </Menu.Item>
                        </Menu.Menu>
                    </Menu>
                    <Route exact path="/" render={
                        (props) => (<AppHeader {...props}
                                            isAuthenticated={this.props.isAuthenticated}
                                            toggleAuth={this.props.toggleAuth} />)
                        }/>
                        <Route exact path="/login" render={
                        (props) => (<Login {...props}
                                            isAuthenticated={this.props.isAuthenticated}
                                            toggleAuth={this.props.toggleAuth} />)
                        }/>
                        <PrivateRoute path="/user"
                                    component={UserView}
                                    isAuthenticated={this.props.isAuthenticated}
                                    toggleAuth={this.props.toggleAuth}/>
                    </div>
                </Router>
            </Container>
        </div>
    );
  }
}

export default AppContainer
