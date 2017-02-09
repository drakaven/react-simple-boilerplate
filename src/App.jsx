import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {

  constructor(props) {
    super(props);
    //find a the first image url and set the image value of the message
    this.imageReplaceContent = (newMessage) => {
      const regex = /\bhttps?:\/\/\S*.(jpg|png|gif)\b/i;
      const match = newMessage.content.match(regex);
      if (match){
        newMessage.image = match[0];
        newMessage.content = newMessage.content.replace(match[0], '');
      }
      return newMessage;
    };

    this.getColor = function () {
      const colors = ["blue", "red", "green", "orange"];
      return colors[Math.floor(Math.random() * 3)];
    };

    //send the message - currently set to use the message text box as a non react controlled field
    this.handleSendMessage = (event) => {
      if (event.key === 'Enter') {
        const username = this.state.currentUser;
        let content = document.getElementById('new-message').value;
        const newMessage = {type: 'postMessage', username: username, content: content, color: this.state.color};
        this.socket.send(JSON.stringify(newMessage));
      }
    };

    //set the user and send notification message - react controlled field
    this.handleChangeUser = (event => {
      if (event.key === 'Enter') {
        const username = this.state.userValue;
        this.setState({currentUser: username});
        const newMessage = {
          type: 'postNotification',
          content: this.state.prevUser + " has changed their name to " + username
        };
        this.socket.send(JSON.stringify(newMessage));
      }
    });

    //change handler for the username field
    this.handleChange = (event) => {
      this.state.prevUser = this.state.currentUser;
      this.setState({userValue: event.target.value});
    };

    this.state = {
      currentUser: "Bob",
      prevUser: "",
      messages: [],
      onlineUsers: 0,
      userValue: "",
      color: this.getColor()
    }
  };

  //handles incoming message types: color is set on connection
  //TODO refactor color from server
  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:4000");
    this.socket.onmessage = (event) => {
      const parsed = JSON.parse(event.data);
      switch (parsed.type) {
        case "onlineUsers":
          this.setState({onlineUsers: parsed.onlineUsers});
          break;
        default:
          let newMessage = {id: parsed.id, username: parsed.username, content: parsed.content, color: parsed.color};
          newMessage = this.imageReplaceContent(newMessage);
          const messages = this.state.messages.concat(newMessage);
          this.setState({messages: messages});
      }
    }
  }

  //render App
  render() {
    return (
      <div className="wrapper">
        <nav>
          <h1>Chatty</h1>
          <span>{this.state.onlineUsers} users online</span>
        </nav>
        <MessageList messages={this.state.messages} color={this.state.color}>
        </MessageList>
        <ChatBar
          handleChange={this.handleChange}
          handleChangeUser={this.handleChangeUser}
          handleSendMessage={this.handleSendMessage}
          defaultName={this.state.currentUser}
          userValue={this.state.userValue}
        />
      </div>
    );
  }
}
export default App;
