import React, {Component} from 'react';
import Image from './InlineImage.jsx';
class Message extends Component {


  render() {
    console.log('message');
    return (
     <div className="message">
      <span className={"username " + this.props.color}>{this.props.name}</span>
       <span className="content">{this.props.content}</span>
       <Image url={this.props.image[0]}/>

    </div>
    );
  }
}
export default Message;