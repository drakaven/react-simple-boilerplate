import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {

  constructor(props) {
    super(props);

    this.imageReplaceContent = (content) => {
      const regex = /\bhttps?:\/\/\S*.(jpg|png|gif)\b/gi;
      const match = content.match(regex);
      console.log(match);
      return match;
    };


    this.handleSendMessage = (event) => {
      if (event.key === 'Enter') {
        const username = this.state.currentUser;

        let content = document.getElementById('new-message').value;
        //content = this.imageReplaceContent(content);
        const newMessage = {type: 'postMessage', username: username, content: content, color: this.state.color};
        this.socket.send(JSON.stringify(newMessage));

      }
    };

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

    this.handleChange = (event) => {
      this.state.prevUser = this.state.currentUser;
      this.setState({userValue: event.target.value});
    };

    this.state = {
      currentUser: "Bob",
      prevUser: "",// optional. if currentUser is not defined, it means the user is Anonymous
      messages: [],
      onlineUsers: 0,
      userValue: ""
    }
  };

  componentDidMount() {
    // console.log("componentDidMount <App />");
    this.socket = new WebSocket("ws://localhost:4000");
    this.socket.onopen = function () {
      // console.log("Connected Web Socket");
    };
    this.socket.onmessage = (event) => {
      const parsed = JSON.parse(event.data);
      // console.log(parsed);
      switch (parsed.type) {
        case "color":
          // console.log(parsed.color);
          this.state.color = parsed.color;
          break;
        case "onlineUsers":
          this.setState({onlineUsers: parsed.onlineUsers});
          break;
        default:
          const newMessage = {image : this.imageReplaceContent(parsed.content), id: parsed.id, username: parsed.username, content: parsed.content, color: parsed.color};
          const messages = this.state.messages.concat(newMessage);
          this.setState({messages: messages});
      }
    }
  }

  render() {
    // console.log("Rendering <App/>");
    return (
      <div className="wrapper">
        <nav>
          <h1>Chatty</h1>
          <span>{this.state.onlineUsers} users online</span>
        </nav>
        <MessageList messages={this.state.messages} color={this.state.color} >
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
