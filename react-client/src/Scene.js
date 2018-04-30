import 'aframe';
import 'aframe-animation-component';
import 'aframe-particle-system-component';
// import {ocean} from 'aframe-extras'
import 'aframe-extras.ocean'
import 'babel-polyfill';
import {Entity, Scene} from 'aframe-react';
import React, { Component } from 'react';
// import ReactDOM from 'react-dom';

class SceneContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
        color: 'red',
        ocean: {
            width: '50',
            density: '20',
            depth: '50',
            position: '',
            rotation: '-90 0 0'
        },
        opaquePlane: {
            position: '0 -1.5 0',
            rotation: '-90 0 0',
            width: '50',
            height: '50',
            color: '#b76040'
        },
        transparentPlane: {
            position: '0 0 0',
            rotation: '-90 0 0',
            width: '50',
            height: '50',
            material: {opacity: 0.0, transparent: true}
        },
        selectedBottle: '',
        bottles: this.props.bottles || []
    };
  }

//   componentWillReceiveProps(nextProps) {
//       if (this.props.bottles.length != nextProps.bottles.length) {
//           this.setState({bottles: nextProps.bottles })
//       }
//   }

  changeColor = () => {
    const colors = ['red', 'orange', 'yellow', 'green', 'blue'];
    this.setState({
      color: colors[Math.floor(Math.random() * colors.length)]
    });
  }

  renderBottles = () => (
      this.props.bottles.map(bottle => {
        let x = Math.random()*35-25;
        let y = -0.5;
        let z = Math.random()*43-25;
        const getRandomArbitrary = (min, max) => Math.random() * (max - min) + min
        const shiftVariation = () => Math.sin(Date.now() / 1000) * getRandomArbitrary(0.2, 0.6)
        const shiftPosition = (x, y, z) => `${x} ${y} ${z}`
        return (
            <Entity id={bottle._id}
                    gltf-model={'#bottle-3d'}
                    key={bottle.name}
                    name={bottle.name}
                    position={{x: x, y: y, z: z}}
                    rotation={{x: 10, y: 0, z: 0}} 
                    scale={{x: 0.1, y: 0.1, z: 0.1}}
                    events={{click: this.props.handleBottleSelect}}
                    animation__position={{
                        property: 'position', 
                        dur: 3000, from: `${x} ${y} ${z}`, 
                        dir: 'alternate', 
                        to: `${x} ${y + shiftVariation()} ${z}`, 
                        loop:true
                    }}/>
        )
    })
  )

  render () {
    const shiftHue = (hue) => (hue + 1) % 360
    const getColor = (hue) => `hsl(${hue}, 100%, 50%)`
    return (
        <div style={{height: '100%'}}>
            {/* <h1>VR Scene</h1> */}
            <Scene embedded={true}>
                <a-assets>
                    <img crossOrigin="anonymous" alt="sky" id="groundTexture" src="https://cdn.aframe.io/a-painter/images/floor.jpg"/>
                    <img crossOrigin="anonymous" alt="floor" id="skyTexture" src="https://cdn.aframe.io/a-painter/images/sky.jpg"/>
                    <a-asset-item id="bottle-3d" src="glass_bottle/scene.gltf"></a-asset-item>
                </a-assets>
                {/* <Entity primitive="a-light" type="ambient" color="#445451"/> */}
                {/* <Entity primitive="a-light" type="point" intensity="2" position="2 4 4"/> */}
                <Entity primitive="a-ocean"
                        staticBody={true}
                        width={this.state.ocean.width} 
                        depth={this.state.ocean.depth}
                        rotation={this.state.ocean.rotation} 
                        density={this.state.ocean.density}/>
                <Entity primitive="a-plane"
                        staticBody={true}
                        width={this.state.opaquePlane.width} 
                        height={this.state.opaquePlane.height}
                        rotation={this.state.opaquePlane.rotation}
                        color={this.state.opaquePlane.color} 
                        position={this.state.opaquePlane.position}/>
                <Entity primitive="a-plane"
                        staticBody={true}
                        width={this.state.transparentPlane.width} 
                        height={this.state.transparentPlane.height}
                        rotation={this.state.transparentPlane.rotation}
                        material={this.state.transparentPlane.material} 
                        position={this.state.transparentPlane.position}/>
                <Entity primitive="a-sky">
                <Entity animation__color={{property: 'color', dur: 3000, from: getColor(shiftHue(0)), to: getColor(shiftHue(0)), loop:true}} />
                </Entity>
                {/* <Entity particle-system={{preset: 'snow', particleCount: 2000}}/> */}
                <Entity text={{value: 'Hello, use the circulor cursor to click on a bottle to view its message!', align: 'center', color:'black'}} position={{x: 0, y: 2, z: -1}}/>
                {/* <a-entity gltf-model="#bottle-3d" position={{x: 0, y: 1, z: -3}} scale="0.1 0.1 0.1"></a-entity> */}
                {/* <Entity gltf-model={'#bottle-3d'} /> */}
                {/* <Entity id="box"
                geometry={{primitive: 'box'}}
                material={{color: this.state.color, opacity: 0.6}}
                // animation__rotate={{property: 'rotation', dur: 2000, loop: true, to: '360 360 360'}}
                // animation__scale={{property: 'scale', dir: 'alternate', dur: 100, loop: true, to: '1.1 1.1 1.1'}}
                position={{x: 0, y: 1, z: -3}}
                events={{click: this.changeColor.bind(this)}}>
                <Entity animation__scale={{property: 'scale', dir: 'alternate', dur: 100, loop: true, to: '2 2 2'}}
                        geometry={{primitive: 'box', depth: 0.2, height: 0.2, width: 0.2}}
                        material={{color: '#24CAFF'}}/>
                </Entity>  */}
                
                {this.props.bottles ? this.renderBottles(): null}

                <Entity primitive="a-camera">
                <Entity primitive="a-cursor" animation__click={{startEvents: 'click', from: '0.1 0.1 0.1', to: '1 1 1', dur: 150}}/>
                </Entity>
            </Scene>
        </div>
    );
  }
}

export default SceneContainer
