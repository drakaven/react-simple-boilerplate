import React, {Component} from 'react';

class Message extends Component {
  render() {
    console.log('message');
    return (
     <div className="message">
      <span className="username">{this.props.name}</span>
      <span className="content">{this.props.content}</span>
    </div>
    );
  }
}
export default Message;