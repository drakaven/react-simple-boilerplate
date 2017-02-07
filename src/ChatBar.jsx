import React, { Component } from 'react';

class ChatBar extends Component {
    render() {
        console.log('chatbar');
        return (
            <footer>
                <input id="username" type="text" placeholder={this.props.defaultName} />
                <input id="new-message" type="text" placeholder="Type a message and hit ENTER" />
            </footer>
        );
    }
}
export default ChatBar;