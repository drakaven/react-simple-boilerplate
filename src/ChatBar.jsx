import React, { Component } from 'react';


class ChatBar extends Component {

constructor(props){
  super(props);

  this.handleKeyPress = (event) => {
    if(event.key == 'Enter'){
      console.log('enter press here!')
    }
  };
}

    render() {
        console.log('chatbar');
        return (
            <footer >
                <input id="username" type="text" placeholder={this.props.defaultName} />
                <input onKeyPress={(event) => { this.handleKeyPress(event)}} id="new-message" type="text" placeholder="Type a message and hit ENTER" />
            </footer>
        );
    }
}
export default ChatBar;