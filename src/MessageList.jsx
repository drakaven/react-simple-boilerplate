import React, {Component} from 'react';
import Message from './Message.jsx';


class MessageList extends Component {
  render() {
    
    return (
     <div id="message-list">
       {this.props.messages.map( (item) => { return <Message key={item.id} name={item.username} content={item.content}/> })}
     </div>
    );
  }
}
export default MessageList;


//{ state.squares.map( (value, i) => { return <Square index={i} value={value} /> } ) }