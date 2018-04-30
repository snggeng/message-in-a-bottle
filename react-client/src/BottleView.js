import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Comment, Segment, Popup, Message } from 'semantic-ui-react'
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
        'user': undefined
    }
  }

  componentWillReceiveProps(nextProps) {
      if (this.props.bottleId != nextProps.bottleId) {
          this.fetchData()
      }
  }

  componentWillMount() {
    let user = getUser(this.props).data
    // console.log('user is ', user)
    this.setState({user})
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
    // console.log(bottle)
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
    let updatedMessage = [...this.state.bottle.message, {comment: this.state.newMessage, user:this.state.user.display, color: this.state.user.color}]
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
                    <h1 className={'title'}>Viewing: {this.state.bottle.name}</h1>
                    <Comment.Metadata>
                    <div>Created By: {this.state.bottle.createdBy}, at {this.state.bottle.updated_at}</div>
                    </Comment.Metadata>
                    {this.state.bottle.message.length != 0 ? this.state.bottle.message.map((message, i) => {
                        return i%2 == 0 ? 
                        (<Segment key={i} textAlign='left' color={message.color}>
                        <p>{message.user}: {message.comment}</p>
                        </Segment>) : 
                        (<Segment key={i} textAlign='right' color={message.color}>
                            <p>{message.user}: {message.comment}</p>
                            </Segment>)
                    }) : 
                    null }
                </Comment.Content>
                </Comment>
            <Form reply>     
            <Form.TextArea value={this.state.newMessage} name='newMessage' onChange={this.handleChange} />
            {this.props.isAuthenticated ? <Button content='Add Comment' labelPosition='left' icon='edit' primary onClick={this.handleUpdateBottle} /> :
            <Button content='Add Comment' labelPosition='left' icon='edit' primary disabled/>}
            </Form>
            { this.props.isAuthenticated ? null : 
                <Message warning>
                    <Message.Header>You must login before you can add comments!</Message.Header>
                    <p>Visit our <Link to={'/signup'}><a>signup</a></Link> page, or <Link to={'/login'}><a>login</a></Link>, then try again.</p>
                </Message> }
        </Comment.Group>
    );
  }
}

export default BottleView
