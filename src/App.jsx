import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';


class App extends Component {

  constructor(props) {
    super(props);

    this.handleSendMessage = (event) => {
      if (event.key === 'Enter') {
        const username = this.state.currentUser;
        const content = document.getElementById('new-message').value;
        const newMessage = {username: username, content: content};
        this.socket.send(JSON.stringify(newMessage));

      }
    };

    this.handleChangeUser = (event => {
      if (event.key === 'Enter') {
        const username = document.getElementById('username').value;
        this.setState({currentUser: username});
      }
    });

    this.state = {
      currentUser: "Bob", // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [],
      onlineUsers: 0
    }
  };


  componentDidMount() {
    console.log("componentDidMount <App />");
    this.socket = new WebSocket("ws://localhost:4000");
    this.socket.onopen = function () {
       console.log("Connected Web Socket");
     };
    this.socket.onmessage = (event) => {
      const parsed = JSON.parse(event.data);
      const newMessage = {id: parsed.id, username: parsed.username, content: parsed.content};
      const messages = this.state.messages.concat(newMessage);
      this.setState({messages: messages});
    }
  }

  render() {
    console.log("Rendering <App/>");
    return (
      <div className="wrapper">
        <nav>
          <h1>Chatty</h1>
          <p>{this.state.onlineUsers}</p>
        </nav>
        <MessageList messages={this.state.messages}>
        </MessageList>
        <ChatBar handleChangeUser={this.handleChangeUser}
                 handleSendMessage={this.handleSendMessage} defaultName={this.state.currentUser}/>
      </div>
    );
  }
}
export default App;
