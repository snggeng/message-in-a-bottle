import React, { Component } from 'react'
import { Form, Button, Comment, Segment } from 'semantic-ui-react'
import { url as server_url } from './utils/api'
import { getUser } from './utils/auth'

class BottleView extends Component {
  constructor(props) {
    super(props);
    this.state = { 
        bottle: {
            'name': '',
            'message': [],
            'updated_at': ''
        },
        'newMessage': '',
    }
  }

  componentWillReceiveProps(nextProps) {
      if (this.props.bottleId != nextProps.bottleId) {
          this.fetchData()
      }
  }

  componentWillMount() {
      this.fetchData()
    //   console.log('bottle', this.state)
  }

  fetchData = async () => {
    const response = await fetch(server_url + '/public/bottles/' + this.props.bottleId, {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    const bottle = await response.json()
    console.log(bottle)
    if (response.status !== 200) throw bottle
    this.setState({ bottle })
  }

  handleChange = (e, { name }) => {
    let prop = this.state
    prop[name] =  e.target.value 
    this.setState(prop)
  }
//   mongodb://heroku_wz7g204z:3en3ik3a12lk600pq00kpa49kf@ds249299.mlab.com:49299/heroku_wz7g204z

  handleUpdateBottle = async () => {
    let updatedMessage = [...this.state.bottle.message, this.state.newMessage]
    console.log(updatedMessage)
    const response = await fetch(server_url + '/public/bottles/' + this.props.bottleId, {
        method: 'put',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({message: updatedMessage})
      })
      // console.log(response)
      const body = await response.json()
      console.log(body)
      if (response.status !== 200) throw body
      this.fetchData()
  }

  render () {
    return (
        <Comment.Group>
                <Comment>
                <Comment.Content>
                    <Comment.Author>{this.state.bottle.name}</Comment.Author>
                    <Comment.Metadata>
                    <div>Created By: {this.state.bottle.createdBy}, at {this.state.bottle.updated_at}</div>
                    </Comment.Metadata>
                    {this.state.bottle.message.length != 0 ? this.state.bottle.message.map((message, i) => {
                        return i%2 == 0 ? 
                        (<Segment key={i} textAlign='left' compact inverted color='teal'>
                        <p>{message}</p>
                        </Segment>) : 
                        (<Segment key={i} textAlign='right' compact inverted color='blue'>
                            <p>{message}</p>
                            </Segment>)
                    }) : 
                    null }
                </Comment.Content>
                </Comment>

            <Form reply>
            <Form.TextArea value={this.state.newMessage} name='newMessage' onChange={this.handleChange} />
            <Button content='Add Comment' labelPosition='left' icon='edit' primary onClick={this.handleUpdateBottle} />
            </Form>
        </Comment.Group>
    );
  }
}

export default BottleView
