import React, {Component} from 'react';

class ChatBar extends Component {
  render() {
    return (
      <footer >
        <input onKeyPress={(event) => {
          this.props.handleChangeUser(event)
        }}
               onChange={(event) => {
                 this.props.handleChange(event)
               }}
               value={this.props.userValue} id="username" type="text" placeholder={this.props.defaultName}/>

        <input onKeyPress={(event) => {
          this.props.handleSendMessage(event)
        }}
               id="new-message" type="text" placeholder="Type a message and hit ENTER"/>
      </footer>
    );
  }
}
export default ChatBar;