import React, { Component } from 'react';
import axios from 'axios';



import placeholder from '../placeholder.jpg';
import Paper from 'material-ui/Paper';
import Slider from 'material-ui/Slider';
import Style from 'style-it';
import { Grid, Row, Col } from 'react-flexbox-grid';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';




const paper = {
    minHeight: 750,
    width: 500,
    margin: 20,
    textAlign: 'center',
    display: 'inline-block',
    padding: '20px'
  }

  const imgStyle = {
      margin: 20,
      textAlign: 'center',
      display: 'inline-block',
    }

class Edit extends Component {
  constructor(props){
    super(props);
    this.state = {
      brightnessValue: 1,
      grayValue: 0,
      satValue: 1,
      invValue: 0,
      sepiaValue: 0,
      conValue: 1,
      blurValue: 0,
      hueValue: 0,
      autoHideDuration: 4000,
      message: 'Image saved',
      open: false
    }
  }
  componentDidMount() {
    const canvas = this.refs.canvas
    const ctx = canvas.getContext("2d")
    const img = this.refs.image
    img.setAttribute('crossOrigin', 'anonymous');
    img.onload = () => {
      ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);
    }
  }
  triggerDefault(event){
    event.preventDefault()
    this.setState({
      brightnessValue: 1,
      grayValue: 0,
      satValue: 1,
      invValue: 0,
      sepiaValue: 0,
      conValue: 1,
      blurValue: 0,
      hueValue: 0,
    })
  }
  triggerSave(e){
    e.preventDefault()
    const canvas = this.refs.canvas
    const dataURL = canvas.toDataURL()
    axios.post('/image/save', {
      user: this.props.user,
      src: dataURL
    }).then(result => {
      //opens snackbar
        this.setState({
          open: true,
        });
      })
    }
//Snackbar
  handleChangeDuration = (event) => {
      const value = event.target.value;
      this.setState({
        autoHideDuration: value.length > 0 ? parseInt(value) : 0,
      });
    };
  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };


//image editing
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
changeHue(event, value) {
 this.setState({
   hueValue:value
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
  let hue = this.state.hueValue;
  const style = {
    image:{
      height: '50vh',
      width: '50vw',
      WebKitFilter: `brightness(${bright}) grayscale(${gray}) saturate(${sat}) invert(${inv}) sepia(${sepia}) contrast(${con}) blur(${blur}px) hue-rotate(${hue}deg)`,
      filter: `brightness(${bright}) grayscale(${gray}) saturate(${sat}) invert(${inv}) sepia(${sepia}) contrast(${con}) blur(${blur}px) hue-rotate(${hue}deg)`
    },
    button:{
      margin: 12
    }
  };
  let imageLink;
  let placeHolderDiv;
  if(this.props.src === ''){
    imageLink = placeholder
    placeHolderDiv = <div><h4>Experiment with the example image or return to the homescreen to upload your own.</h4></div>
  }else{
    imageLink =this.props.src
    placeHolderDiv= <div/>
  }
  return (
    <Grid fluid>
    <Snackbar
       open={this.state.open}
       message={this.state.message}
       autoHideDuration={this.state.autoHideDuration}
       onRequestClose={this.handleRequestClose}
     />
    <Row middle="xs">
      <Col xs>
      <div style={imgStyle}>
        {placeHolderDiv}
        <canvas ref="canvas" style={style.image}> </canvas>
        <img ref="image" src={imageLink} className="hidden" />
      </div>
      </Col>
      <Col xs>
        <Paper style={paper} zDepth={3}>
        <Row>
        <Col xs={3}>
           <RaisedButton
              label="Save"
              secondary={true}
              style={style.button}
              onClick={(e) => this.triggerSave(e)}
          />
        </Col>
          <Col xsOffset={6} xs={3}>
             <RaisedButton
                label="Reset"
                primary={true}
                style={style.button}
                onClick={(e) => this.triggerDefault(e)}
            />
          </Col>
        </Row>
        <Row>
          <Col xs>
            <h5> Brightness </h5>
            <p> {bright *100}% </p>
            <Slider
              onChange={(event, value) => this.changeBrightness(event, value)}
              max={2}
              min={0}
              value={this.state.brightnessValue}
            />

            <h5> Grayscale </h5>
            <p> {gray *100}% </p>
            <Slider
              onChange={(event, value) => this.changeGray(event, value)}
              max={1}
              min={0}
              value={this.state.grayValue}
            />

            <h5> Saturation </h5>
            <p> {sat *100}% </p>
            <Slider
              onChange={(event, value) => this.changeSat(event, value)}
              max={4}
              min={0}
              value={this.state.satValue}
            />


            <h5> Contrast </h5>
            <p> {con *100}% </p>
            <Slider
              onChange={(event, value) => this.changeCon(event, value)}
              max={4}
              min={0}
              value={this.state.conValue}
            />
          </Col>
          <Col xs>
            <h5> Inversion </h5>
            <p> {inv *100}% </p>
            <Slider
              onChange={(event, value) => this.changeInv(event, value)}
              max={1}
              min={0}
              value={this.state.invValue}
            />

            <h5> Sepia </h5>
            <p> {sepia *100}% </p>
            <Slider
              onChange={(event, value) => this.changeSepia(event, value)}
              max={1}
              min={0}
              value={this.state.sepiaValue}
            />

            <h5> Blur </h5>
            <p> {blur}px </p>
            <Slider
              onChange={(event, value) => this.changeBlur(event, value)}
              max={100}
              min={0}
              value={this.state.blurValue}
            />
            <h5> Hue Rotate</h5>
            <p> {hue}&#176; </p>
            <Slider
              onChange={(event, value) => this.changeHue(event, value)}
              max={360}
              min={0}
              value={this.state.hueValue}
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
