import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';


class App extends Component {

  constructor(props) {
    super(props);

    this.handleKeyPress = (event) => {
      if (event.key == 'Enter') {
        const username = document.getElementById('username').value;
        const content = document.getElementById('new-message').value;
        const newMessage = {id: this.state.messages.length + 1, username: username, content: content};
        const messages = this.state.messages.concat(newMessage);
        this.socket.send(JSON.stringify(newMessage));
        this.setState({messages: messages});
      }
    };

    this.state = {
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        {
          id: 1,
          username: "Bob",
          content: "Has anyone seen my marbles?",
        },
        {
          id: 2,
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
      ]
    };

    this.socket = null;
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    this.socket = new WebSocket("ws://localhost:4000");
    this.socket.onopen = function (event) {
       console.log("Connected Web Socket");
     };
  }

  render() {
    console.log("Rendering <App/>");
    return (
      <div className="wrapper">
        <nav>
          <h1>Chatty</h1>
        </nav>
        <MessageList messages={this.state.messages}>
        </MessageList>
        <ChatBar handleKeyPress={this.handleKeyPress} defaultName={this.state.currentUser.name}/>
      </div>
    );
  }
}
export default App;
