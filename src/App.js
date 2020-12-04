import React from 'react';
import IO from './IO'
import World from './World'
import './App.css';


IO.init()



export default class App extends React.Component {

  state = {
    userName: ''
  }

  componentDidMount(){
    World.init()
    //Player.init()
  }
    
  render(){
      return (
      <div>
          <h1>Multiplayer Game</h1>
          <span>Username: </span><input onChange={e => this.setState({userName: e.target.value})} type="text" id="username"/>
          <button id="login" onClick={() => IO.login(this.state.userName)}>Log-in</button>
          <canvas id="canvas" style={{"width": "100%", "height": "100%"}}/>
      </div>
    )

  }



}