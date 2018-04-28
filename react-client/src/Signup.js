import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react'

class UserView extends Component {
  constructor(props) {
    super(props);
    this.state = { 
    }
  }

  fetchData = () => {

  }

  render () {
    return (
        <Form>
            <Form.Group widths='equal'>
            <Form.Input fluid label='First name' placeholder='First name' />
            <Form.Input fluid label='Last name' placeholder='Last name' />
            </Form.Group>
            <Form.Input fluid label='Display name' placeholder='Enter your display name' />
            <Form.Input fluid label='Password' placeholder='Enter password' type='password'/>
            <Button type='submit'>Submit</Button>
        </Form>
    );
  }
}

export default UserView
