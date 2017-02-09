import React, {Component} from 'react';
import Image from './InlineImage.jsx';
class Message extends Component {


  render() {
    //if there is an image render the image
    let messageImage = null;
    if (this.props.image.image) {
      messageImage = <Image url={this.props.image.image}/>
    };

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