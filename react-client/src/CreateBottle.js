import React, { Component } from 'react';
import { Container, Input, Menu } from 'semantic-ui-react'

class CreateBottle extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  fetchData = () => {

  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render () {
    const { activeItem } = this.state
    return (
        <div>
            <h1 className={'title'}>Create Bottle</h1>
        </div>
    );
  }
}

export default CreateBottle
