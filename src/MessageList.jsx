import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    
    return (
     <div id="message-list">
       {this.props.messages.map( (item) => { return <Message image={item.image} color={item.color} key={item.id} name={item.username} content={item.content}/> })}
     </div>
    );
  }
}
export default MessageList;


