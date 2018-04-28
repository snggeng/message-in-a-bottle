import React, { Component } from 'react';
import { Container, Input, Menu } from 'semantic-ui-react'
import CreateBottle from './CreateBottle'

class UserView extends Component {
  constructor(props) {
    super(props);
    this.state = { 
    }
  }

  fetchData = () => {

  }

  render () {
    const { activeItem } = this.state
    return (
        <div>
            <h1 className={'title'}>Message In A Bottle</h1>
            <p>{this.props.bottleSelected ? this.props.bottleId : 'no bottle selected'}</p>
            <p>User View.</p>
            <CreateBottle />
        </div>
    );
  }
}

export default UserView
