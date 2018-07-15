import React, { Component } from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { getUser, decodeToken, logout } from '../utils/auth'
import { url as server_url } from '../utils/api'
import './style.css'

export default class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      user: {
        username: '',
        password: '',
        sso: false
      },
      isAuthenticated: this.props.isAuthenticated,
      isOpen: false
    }
  }

  componentWillReceiveProps(){
    // redirect user
    this.props.isAuthenticated ? this.props.history.push('/user') : this.props.history.push('/login')
  }

  // componentWillMount() {
  //   // Validate if token is expired and redirect user accordingly
  //   let jwt = window.sessionStorage.getItem('token')
  //   if (jwt) {
  //     let token = decodeToken()
  //     const current_time = (Date.now().valueOf() / 1000) // get UTC time
  //     // TODO: option to refresh tokens on expiry
  //     if (token.exp < current_time) {
  //       console.log('token expired')
  //       // prompt user to login again
  //       // showToast('error', 'Your token has expired. Please login again.', null)
  //     } else {
  //       // if user is logged in, do not redirect to dashboard on logout
  //       this.props.toggleAuth(true)
  //       // populate req.user so logs can access user
  //       fetch(server_url + '/public/refresh', {
  //         headers: {
  //           'Accept': 'application/json',
  //           'Content-Type': 'application/json',
  //           'Authorization': jwt
  //         }
  //       })
  //     }
  //   }
  // }

  // Authentication
  signIn = async (user) => {
    // we are not checking for expired tokens right now due to react render issues
    // Check if token exists
    const response = await fetch(server_url + '/public/signin', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    // console.log(response)
    const body = await response.json()
    // console.log(body)
    if (response.status !== 200) {
      alert('wrong username or password')
      throw body
    }

    return body
  }

  handleLockClick = () => this.setState({ showPassword: !this.state.showPassword })

  handleKeyPressAuth = (e) => {
    if (e.key === 'Enter') {
      this.handleAuth()
    }
  }

  handleAuth = () =>  {
    this.signIn(this.state.user)
    .then(res => {
      // set token for api calls
      window.sessionStorage.setItem('token', res.token)
      // toggle authentication
      this.props.toggleAuth(true)
      // console.log(this.props.isAuthenticated)
      // console.log('Login Successful')
    })
    .catch(err => {
      console.error(err.stack);
    //   showToast('error', err.toString(), err)
    })
  }

  handleChange = (event) => {
    // console.log('this is the event target ', event.targe)
    // console.log('this is the state ', this.state)
    let values = this.state.user
    event.target.name === 'username' ?
    values.username = event.target.value :
    values.password = event.target.value
    this.setState(values)
  }

  toggleDialog = () => {
    this.setState({isOpen: !this.state.isOpen})
  }

  render() {
    const { disabled, showPassword} = this.state
    /* Styles */
    const container = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100vw',
      height: '100vh',
    //   backgroundImage: 'url(' + pattern + ')',
      backgroundSize: '80%'
    }

    const loginContainer = {
      maxWidth: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '500px',
      height: '400px',
    }

    /* components */
    return (
        <div>
            <Grid
            textAlign='center'
            // style={container}
            verticalAlign='middle'
            >
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h2' color='teal' textAlign='center'>
                {/* <Image src='/logo.png' /> */}
                {' '}Log-in to your account
                </Header>
                <Form size='large'>
                <Segment stacked>
                    <Form.Input
                    fluid
                    icon='user'
                    iconPosition='left'
                    name='username'
                    value={this.state.user.username}
                    onChange={this.handleChange}
                    placeholder='Enter Username'
                    />
                    <Form.Input
                    fluid
                    icon='lock'
                    iconPosition='left'
                    value={this.state.user.password}
                    onChange={this.handleChange}
                    onKeyPress={this.handleKeyPressAuth}
                    placeholder='Enter Password'
                    type='password'
                    />

                    <Button color='teal' fluid size='large' onClick={this.handleAuth}>Login</Button>
                </Segment>
                </Form>
                <Message>
                New to us? <Link to={'/signup'} replace><a>Sign Up</a></Link>
                </Message>
            </Grid.Column>
            </Grid>
        </div>
    )
  }
}
