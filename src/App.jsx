import React, { Component } from 'react';
import MessageList from './MessageList.jsx';
import Message from './Message.jsx';
import ChatBar from './ChatBar.jsx';

const squares = [1, 2, 3];

class App extends Component {
  render() {
    console.log("Rendering <App/>");    
    return (
      <div class="wrapper">
        <nav>
          <h1>Chatty</h1>
        </nav>
        <MessageList>
          <Message />  
        </MessageList>
        <ChatBar />
      </div>
    );
  }
}
export default App;
