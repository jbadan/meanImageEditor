import React, { Component } from 'react';
import placeholder from './placeholder.jpg';
import Paper from 'material-ui/Paper';
import Slider from 'material-ui/Slider';
import Style from 'style-it';
import { Grid, Row, Col } from 'react-flexbox-grid';

const paper = {
    height: '80vh',
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
      invValue: 0,
      sepiaValue: 0,
      conValue: 1,
      blurValue: 0
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
changeSepia(event, value) {
 this.setState({
   sepiaValue:value
 })
}
changeCon(event, value) {
 this.setState({
   conValue:value
 })
}
changeBlur(event, value) {
 this.setState({
   blurValue:value
 })
}
render() {
  let bright = this.state.brightnessValue;
  let gray = this.state.grayValue;
  let sat = this.state.satValue;
  let inv = this.state.invValue;
  let sepia = this.state.sepiaValue;
  let con = this.state.conValue;
  let blur = this.state.blurValue;
  const style = {
    image:{
      height: 400,
      width: 500,
      WebKitFilter: `brightness(${bright}) grayscale(${gray}) saturate(${sat}) invert(${inv}) sepia(${sepia}) contrast(${con}) blur(${blur}px)`,
      filter: `brightness(${bright}) grayscale(${gray}) saturate(${sat}) invert(${inv}) sepia(${sepia}) contrast(${con}) blur(${blur}px)`
    }
  };
  let imageLink;
  if(this.state.src === ''){
    imageLink = <img style={style.image} src={placeholder} />
  }else{
    imageLink = <img style={style.image} src={this.props.src} />
  }
  return (
    <Grid fluid>
    <Row>
      <Col xs>
      <Paper style={paper} zDepth={3}>
        {imageLink}
      </Paper>
      </Col>
      <Col xs>
        <Paper style={paper} zDepth={3}>
        <Row>
          <Col xs>
            <h5> Brightness </h5>
            <p> {bright *100}% </p>
            <Slider
              onChange={(event, value) => this.changeBrightness(event, value)}
              max={2}
              min={0}
              defaultValue={1}
            />

            <h5> Grayscale </h5>
            <p> {gray *100}% </p>
            <Slider
              onChange={(event, value) => this.changeGray(event, value)}
              max={1}
              min={0}
              defaultValue={0}
            />

            <h5> Saturation </h5>
            <p> {sat *100}% </p>
            <Slider
              onChange={(event, value) => this.changeSat(event, value)}
              max={4}
              min={0}
              defaultValue={1}
            />
            <h5> Contrast </h5>
            <p> {con *100}% </p>
            <Slider
              onChange={(event, value) => this.changeCon(event, value)}
              max={4}
              min={0}
              defaultValue={1}
            />
          </Col>
          <Col xs>
            <h5> Inversion </h5>
            <p> {inv *100}% </p>
            <Slider
              onChange={(event, value) => this.changeInv(event, value)}
              max={1}
              min={0}
              defaultValue={0}
            />

            <h5> Sepia </h5>
            <p> {sepia *100}% </p>
            <Slider
              onChange={(event, value) => this.changeSepia(event, value)}
              max={1}
              min={0}
              defaultValue={0}
            />

            <h5> Blur </h5>
            <p> {blur}px </p>
            <Slider
              onChange={(event, value) => this.changeBlur(event, value)}
              max={100}
              min={0}
              defaultValue={0}
            />
          </Col>
          </Row>
        </Paper>
      </Col>
    </Row>
    </Grid>
  )
}
}

export default Edit;
