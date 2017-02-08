import React, {Component} from 'react';
import Image from './InlineImage.jsx';
class Message extends Component {


  render() {
    let messageImage = null;

    if (this.props.image.image) {
      let messageImage = <Image url={this.props.image}/>
    };

    console.log('message');
    return (
     <div className="message">
      <span className={"username " + this.props.color}>{this.props.name}</span>
       <p className="content">{this.props.content}</p>
       {messageImage}

    </div>
    );
  }
}
export default Message;