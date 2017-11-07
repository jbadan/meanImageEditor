import React, { Component } from 'react';


class Edit extends Component {
  constructor(props){
    super(props);
    this.state = {
      src: this.props.src
    }
  }
render() {
  return (
    <div>
      <img src={this.state.src} />
    </div>
  )
}
}

export default Edit;
