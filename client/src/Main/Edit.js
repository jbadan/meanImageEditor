import React, { Component } from 'react';
import placeholder from './placeholder.jpg';
import Paper from 'material-ui/Paper';
import Slider from 'material-ui/Slider';
import Style from 'style-it';

const paper = {
    height: 400,
    width: 500,
    margin: 20,
    textAlign: 'center',
    display: 'inline-block',
  }

class Edit extends Component {
  constructor(props){
    super(props);
    this.state = {
      src: this.props.src,
      brightnessValue: 1,
      grayValue: 0,
      satValue: 1,
      invValue: 0
    }
  }

  changeBrightness(event, value) {
   this.setState({
     brightnessValue:value
   })
 }
 changeGray(event, value) {
  this.setState({
    grayValue:value
  })
}
changeSat(event, value) {
 this.setState({
   satValue:value
 })
}
changeInv(event, value) {
 this.setState({
   invValue:value
 })
}
render() {
  let bright = this.state.brightnessValue;
  let gray = this.state.grayValue;
  let sat = this.state.satValue;
  let inv = this.state.invValue;
  const style = {
    image:{
      height: 400,
      width: 500,
      WebKitFilter: `brightness(${bright}) grayscale(${gray}) saturate(${sat}) invert(${inv})`,
      filter: `brightness(${bright}) grayscale(${gray}) saturate(${sat}) invert(${inv})`
    }
  };
  let imageLink;
  if(this.state.src === ''){
    imageLink = <img style={style.image} src={placeholder} />
  }else{
    imageLink = <img style={style.image} src={this.props.src} />
  }
  return (
    <div>
      <Paper style={paper} zDepth={3}>
        {imageLink}
      </Paper>
      <Paper style={paper} zDepth={3}>
        <h4> Brightness </h4>
        <p> {bright *100}% </p>
        <Slider
          onChange={(event, value) => this.changeBrightness(event, value)}
          max={2}
          min={0}
          defaultValue={1}
        />

        <h4> Grayscale </h4>
        <p> {gray *100}% </p>
        <Slider
          onChange={(event, value) => this.changeGray(event, value)}
          max={1}
          min={0}
          defaultValue={0}
        />

        <h4> Saturation </h4>
        <p> {sat *100}% </p>
        <Slider
          onChange={(event, value) => this.changeSat(event, value)}
          max={4}
          min={0}
          defaultValue={1}
        />

        <h4> Inversion </h4>
        <p> {inv *100}% </p>
        <Slider
          onChange={(event, value) => this.changeInv(event, value)}
          max={1}
          min={0}
          defaultValue={0}
        />
      </Paper>
    </div>
  )
}
}

export default Edit;
