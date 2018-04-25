import React, { Component } from 'react';
import { Container, Input, Menu } from 'semantic-ui-react'
// import './UserView.css';

class UserView extends Component {
  constructor(props) {
    super(props);
    this.state = {
        activeItem: 'home' 
    }
  }

  fetchData = () => {

  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render () {
    const { activeItem } = this.state
    return (
        <div>
            <Container style={{paddingRight:'2rem', height: '100vh'}}>
             <Menu pointing secondary>
                <Menu.Item className={'title'} name='home' active={activeItem === 'home'} onClick={this.handleItemClick} />
                <Menu.Item className={'title'} name='about' active={activeItem === 'about'} onClick={this.handleItemClick} />
                <Menu.Item className={'title'} name='bottles' active={activeItem === 'bottles'} onClick={this.handleItemClick} />
                <Menu.Menu position='right'>
                <Menu.Item className={'title'} name='logout' active={activeItem === 'logout'} onClick={this.handleItemClick} />
                </Menu.Menu>
            </Menu>
                <h1 className={'title'}>Message In A Bottle</h1>
                <p>{this.props.bottleSelected ? this.props.bottleId : 'no bottle selected'}</p>

                <p>Find messages others have left behind in our webVR ocean on the left.</p>
                <p>Alternatively, create your own.</p>
            </Container>
        </div>
    );
  }
}

export default UserView
