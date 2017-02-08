import React, {Component} from 'react';


class Image extends Component {
  render() {
    return (
      <img className="inlineImage" src={this.props.url} />
    );
  }
}
export default Image;