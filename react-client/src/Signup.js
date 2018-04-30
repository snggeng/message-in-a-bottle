import React, { Component } from 'react'
import { Form, Button } from 'semantic-ui-react'
import { url as server_url } from './utils/api'
import { getUser } from './utils/auth'

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      'display': '',
      'username': '',
      'password': ''
    }
  }

  handleChange = (e, { name }) => {
    let user = this.state
    user[name] =  e.target.value 
    console.log(user)
    this.setState(user)
  }

  handleCreateUser = async () => {
    console.log('create user')
    const response = await fetch(server_url + '/public/users', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.state)
      })
      // console.log(response)
      const body = await response.json()
      // console.log(body)
      if (response.status !== 200) throw body
  }

  render () {
    return (
        <Form>
            <Form.Group widths='equal'>
            <Form.Input fluid label='Display name' name='display' placeholder='Enter your display name' onChange={this.handleChange}/>
            </Form.Group>
            <Form.Input fluid label='Username' name='username' placeholder='Enter your username' onChange={this.handleChange}/>
            <Form.Input fluid label='Password' name='password' placeholder='Enter password' type='password'onChange={this.handleChange}/>
            <Button type='submit' onClick={this.handleCreateUser}>Submit</Button>
        </Form>
    );
  }
}

export default Signup
