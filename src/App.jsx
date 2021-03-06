// ES5
import React, {Component} from 'react';
import MessageList from './messageList.jsx';
import CharBar from './charBar.jsx';
const socket = new WebSocket("ws://chat-app-server.heroku.com/socketserver");

const App = React.createClass({

  getInitialState: function() {
    return {
      data: {
        currentUser: {name: 'Anonymous'}, // optional. if currentUser is not defined, it means the user is Anonymous`
        messages: []
      },
      onlineUser: 0,
      color: ''
    };
  },

  postMessage: function(message) {
    socket.send(JSON.stringify(message));
  },

  postNotification: function(message) {
    socket.send(JSON.stringify(message));
  },

  componentDidMount: function() {

    socket.onopen = function(event) {
      console.log("Connected to websocket server");
    };

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      let newData;
      switch (message.type) {
        case 'onlineUser':
          this.setState({onlineUser: message.length});
          break;
        case 'color':
          // console.log('color = ' + message.color);
          this.setState({color: message.color});
          break;
        case 'incomingMessage':
          newData = Object.assign( {}, this.state.data, {
            messages: this.state.data.messages.concat([message])
          });
          this.setState({data: newData});
          break;
        case 'incomingNotification':
          newData = Object.assign( {}, this.state.data, {
            messages: this.state.data.messages.concat([message])
          });
          this.setState({data: newData});
          break;
        default:
          throw new Error("Unknown event type " + data.type);
      }
    };

  },

  render: function() {
    return (
      <div className="wrapper">
        <nav style={{background: this.state.color}}>
          <h1>Chatty</h1>
          <h2>{this.state.onlineUser} users online</h2>
        </nav>
        <MessageList data={this.state.data}/>
        <CharBar data={this.state.data} postMessage={this.postMessage} postNotification={this.postNotification} color={this.state.color}/>
      </div>
    );
  }

});

export default App;

// ES6
// import React, {Component} from 'react';
//
// class App extends Component {
//   render() {
//     return (
//       <h1>Hello React :)</h1>
//     );
//   }
// }
// export default App;
