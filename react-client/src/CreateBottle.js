import React, { Component } from 'react';
import { Button, Checkbox, Form, Message } from 'semantic-ui-react'
import { url as server_url } from './utils/api'
import { getUser } from './utils/auth'

class CreateBottle extends Component {
  constructor(props) {
    super(props);
    this.state = {
        bottle: {
            name: '',
            message: ''
        },
        success: false
    }
  }


  handleChange = (event) => {
    let bottle = this.state.bottle
    event.target.name === 'name' ?
    bottle.name = event.target.value :
    bottle.message = event.target.value
    // console.log(bottle)
    this.setState(bottle)
  }

  handleCreateBottle = async () => {
    let user = getUser(this.props).data
    let bottle = {
      name: this.state.name,
      message: [{
        comment: this.state.message,
        user: user.display,
        color: user.color
      }],
      createdBy: user._id
    }
    // console.log('user id', user._id)
    const response = await fetch(server_url + '/api/bottles', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': user.token
        },
        body: JSON.stringify(bottle)
      })
      // console.log(response)
      const body = await response.json()
      // console.log(body)
      if (response.status !== 200) throw body
      await this.setState({success: true})
      // await setTimeout(this.setState({success: false}), 1000)
      // window.location.reload(true)
  }

  render () {
    const { activeItem } = this.state
    return (
        <div>
            <h1 className={'title'}>Create Bottle</h1>
            {this.state.success ? 
            <Message success>
                    <Message.Header>Created a new bottle!</Message.Header>
            </Message> : null }
            <Form>
                <Form.Field>
                <label>Bottle Name</label>
                <input placeholder='Enter Bottle Name' name={'name'} onChange={this.handleChange} value={this.state.bottle.name}/>
                </Form.Field>
                <Form.Field>
                <label>Message</label>
                <input placeholder='Enter an initial message' name={'message'} onChange={this.handleChange} value={this.state.bottle.message} />
                </Form.Field>
                <Button type='submit' onClick={this.handleCreateBottle}>Create</Button>
            </Form>
        </div>
    );
  }
}

export default CreateBottle
