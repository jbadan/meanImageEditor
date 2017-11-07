import React, { Component } from 'react';
import placeholder from './placeholder.jpg';
import Paper from 'material-ui/Paper';

const style = {
  paper: {
    height: 400,
    width: 500,
    margin: 20,
    textAlign: 'center',
    display: 'inline-block',
  },
  image:{
    height: 400,
    width: 500
  }
};


class Edit extends Component {
  constructor(props){
    super(props);
    this.state = {
      src: this.props.src
    }
  }

render() {
  let imageLink;
  if(this.state.src === ''){
    imageLink = <img style={style.image} src={placeholder} />
  }else{
    imageLink = <img style={style.image} src={this.props.src} />
  }
  return (
    <Paper style={style.paper} zDepth={3}>
      {imageLink}
    </Paper>
  )
}
}

export default Edit;
