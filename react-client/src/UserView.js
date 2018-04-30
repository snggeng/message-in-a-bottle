import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react'
import { url as server_url } from './utils/api'
import { getUser } from './utils/auth'
import CreateBottle from './CreateBottle'
import BottleView from './BottleView'

class UserView extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      userBottles: undefined,
      bottles: undefined
    }
  }

  componentWillMount() {
    this.fetchData()
  }

  fetchData = async () => {
    let user = getUser(this.props).data
    console.log('user id', user._id)
    const response = await fetch(server_url + '/api/bottles/' + user._id, {
        method: 'get',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': user.token
        }
      })
    // console.log(response)
    const userBottles = await response.json()
    // console.log(body)
    if (response.status !== 200) throw userBottles
    console.log('users bottles', userBottles)
    this.setState(userBottles)
    const getBottles = await fetch(server_url + '/api/bottles/', {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': user.token
      }
    })
    const bottles = await getBottles.json()
      // console.log(body)
      if (response.status !== 200) throw bottles
      console.log('all bottles', bottles)
      this.setState(bottles)
  }

  render () {
    const { activeItem } = this.state
    return (
        <div>
          <h1 className={'title'}>Message In A Bottle</h1>
          {this.props.bottleSelected ? (
              <Segment>
                <BottleView bottleId={this.props.bottleId} bottleSelected={this.props.bottleSelected} isAuthenticated={this.props.isAuthenticated}/>
              </Segment>
            ) : (
              <Segment>
                <CreateBottle isAuthenticated={this.props.isAuthenticated} />
              </Segment>
          ) 
          }
        </div>
    );
  }
}

export default UserView
