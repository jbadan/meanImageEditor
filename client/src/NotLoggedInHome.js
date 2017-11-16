import React, { Component } from 'react';
import axios from 'axios';
import Footer from './Footer';

import placeholder from './placeholder.jpg';
import Paper from 'material-ui/Paper';
import Slider from 'material-ui/Slider';
import Style from 'style-it';
import { Grid, Row, Col } from 'react-flexbox-grid';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';



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

class NotLoggedInHome extends Component {
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
      value: 1,
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

  //question dialog box open/close
  handleQuestionOpen = () => {
   this.setState({open: true});
 };
 handleQuestionClose = () => {
   this.setState({open: false});
 };


  //presets dropdown controller
  handleChangePreset = (event, index, value) => {
    //1977
    if(value === 2){
      this.setState({
        value: value,
        conValue: 1.1,
        brightnessValue: 1.1,
        satValue: 1.3,
        grayValue: 0,
        invValue: 0,
        sepiaValue: 0,
        blurValue: 0,
        hueValue: 0,
      });
      //Aden
    }else if(value === 3){
      this.setState({
        value: value,
        conValue: .9,
        brightnessValue: 1.2,
        satValue: .85,
        hueValue: 20,
        grayValue: 0,
        invValue: 0,
        sepiaValue: 0,
        blurValue: 0,
      })
      //Amaro
    }else if(value === 4){
      this.setState({
        value:value,
        conValue: .9,
        brightnessValue: 1.1,
        satValue: 1.5,
        hueValue: -10,
        grayValue: 0,
        invValue: 0,
        sepiaValue: 0,
        blurValue: 0,
      })
      //Brannan
    }else if(value === 5){
      this.setState({
        sepiaValue: .5,
        conValue: 1.4,
        value:value,
        brightnessValue: 1,
        grayValue: 0,
        satValue: 1,
        invValue: 0,
        blurValue: 0,
        hueValue: 0,
      })
      //Brooklyn
    }else if(value === 6){
      this.setState({
        brightnessValue: 1.1,
        conValue: .9,
        value:value,
        grayValue: 0,
        satValue: 1,
        invValue: 0,
        sepiaValue: 0,
        blurValue: 0,
        hueValue: 0,
      })
      //Claredon
      }else if(value === 7){
        this.setState({
          satValue: 1.25,
          conValue: 1.2,
          value:value,
          brightnessValue: 1,
          grayValue: 0,
          invValue: 0,
          sepiaValue: 0,
          blurValue: 0,
          hueValue: 0,
        })
        //Earlybird
    }else if(value === 8){
      this.setState({
        sepiaValue: .2,
        conValue: .9,
        value:value,
        brightnessValue: 1,
        grayValue: 0,
        satValue: 1,
        invValue: 0,
        blurValue: 0,
        hueValue: 0,
      })
      //Gingham
    }else if(value === 9){
      this.setState({
        brightnessValue: 1.05,
        hueValue: 350,
        value:value,
        grayValue: 0,
        satValue: 1,
        invValue: 0,
        sepiaValue: 0,
        conValue: 1,
        blurValue: 0,
      })
      //Hudson
    }else if(value === 10){
      this.setState({
        brightnessValue: 1.2,
        satValue: 1.1,
        conValue: .9,
        value:value,
        grayValue: 0,
        invValue: 0,
        sepiaValue: 0,
        blurValue: 0,
        hueValue: 0,
      })
      //Inkwell
    }else if(value === 11){
      this.setState({
        grayValue: 1,
        sepiaValue: .3,
        brightnessValue: 1.1,
        conValue: 1.1,
        value:value,
        satValue: 1,
        invValue: 0,
        blurValue: 0,
        hueValue: 0,
      })
      //Lofi
    }else if(value === 12){
      this.setState({
        brightnessValue: 1,
        grayValue: 0,
        invValue: 0,
        sepiaValue: 0,
        blurValue: 0,
        hueValue: 0,
        satValue: 1.1,
        conValue: 1.5,
        value:value
      })
    }else{
      this.setState({
        brightnessValue: 1,
        grayValue: 0,
        satValue: 1,
        invValue: 0,
        sepiaValue: 0,
        conValue: 1,
        blurValue: 0,
        hueValue: 0,
        value:value
      })
    }
}
  //reset button
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
      height: '450px',
      width: '600px',
      WebKitFilter: `brightness(${bright}) grayscale(${gray}) saturate(${sat}) invert(${inv}) sepia(${sepia}) contrast(${con}) blur(${blur}px) hue-rotate(${hue}deg)`,
      filter: `brightness(${bright}) grayscale(${gray}) saturate(${sat}) invert(${inv}) sepia(${sepia}) contrast(${con}) blur(${blur}px) hue-rotate(${hue}deg)`
    },
    button:{
      margin: 12
    },
    customWidth: {
      width: 300,
      fontSize: '1em'
    },
    color: {
      color: '#FFFFFE'
    }

  };
    let imageLink = placeholder
    let placeHolderDiv = <div><h3>Experiment with the example image or log in to upload your own.</h3></div>
    const actions = [
      <FlatButton
        label="Close"
        primary={true}
        onClick={this.handleQuestionClose}
      />,
    ];
  return (
    <Grid fluid>
    <Row>
      <Col xs>
      <Row start="xs">
        <Col xs>
        <div className="animationContainer">
        <div className="pulse"/>
        <i className="fa fa-question-circle-o fa-3x" aria-hidden="true" onClick={this.handleQuestionOpen}></i>
        </div>
          <Dialog
          title="Need Help?"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleQuestionClose}
        >
          <p style={style.color}> What is Bokeh? </p>
          <p>Bokeh is the aesthetic quality of the blur produced in the out-of-focus parts of an image produced by a lens.</p>
          <p style={style.color}> How do I use Bokeh? </p>
          <p> Get to know Bokeh by experimenting with the control panel next to the sample image. To upload your own image and for more options, log in or sign up. </p>
        </Dialog>
        </Col>

      </Row>
      </Col>
    </Row>
    <Row middle="xs">
      <Col xs/>
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
          <Col xsOffset={9} xs={3}>
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
            <p> Brightness </p>
            <p> {Math.round(bright*100)}% </p>
            <Slider
              onChange={(event, value) => this.changeBrightness(event, value)}
              max={2}
              min={0}
              value={this.state.brightnessValue}
            />

            <p> Grayscale </p>
            <p> {Math.round(gray*100)}% </p>
            <Slider
              onChange={(event, value) => this.changeGray(event, value)}
              max={1}
              min={0}
              value={this.state.grayValue}
            />

            <p> Saturation </p>
            <p> {Math.round(sat*100)}% </p>
            <Slider
              onChange={(event, value) => this.changeSat(event, value)}
              max={4}
              min={0}
              value={this.state.satValue}
            />


            <p> Contrast </p>
            <p> {Math.round(con*100)}% </p>
            <Slider
              onChange={(event, value) => this.changeCon(event, value)}
              max={4}
              min={0}
              value={this.state.conValue}
            />
          </Col>
          <Col xs>
            <p> Inversion </p>
            <p> {Math.round(inv*100)}% </p>
            <Slider
              onChange={(event, value) => this.changeInv(event, value)}
              max={1}
              min={0}
              value={this.state.invValue}
            />

            <p> Sepia </p>
            <p> {Math.round(sepia*100)}% </p>
            <Slider
              onChange={(event, value) => this.changeSepia(event, value)}
              max={1}
              min={0}
              value={this.state.sepiaValue}
            />

            <p> Blur </p>
            <p> {Math.round(blur)}px </p>
            <Slider
              onChange={(event, value) => this.changeBlur(event, value)}
              max={100}
              min={0}
              value={this.state.blurValue}
            />
            <p> Hue Rotate</p>
            <p> {Math.round(hue)}&#176; </p>
            <Slider
              onChange={(event, value) => this.changeHue(event, value)}
              max={360}
              min={0}
              value={this.state.hueValue}
            />
          </Col>
          </Row>
          <Row middle="xs">
            <Col xs>
            <DropDownMenu
              value={this.state.value}
              onChange={this.handleChangePreset}
              style={style.customWidth}
              autoWidth={false}
              >
                 <MenuItem value={1} primaryText="Choose a Preset" />
                 <MenuItem value={2} primaryText="1977" />
                 <MenuItem value={3} primaryText="Aden" />
                 <MenuItem value={4} primaryText="Amaro" />
                 <MenuItem value={5} primaryText="Brannan" />
                 <MenuItem value={6} primaryText="Brooklyn" />
                 <MenuItem value={7} primaryText="Clarendon" />
                 <MenuItem value={8} primaryText="Earlybird" />
                 <MenuItem value={9} primaryText="Gingham" />
                 <MenuItem value={10} primaryText="Hudson" />
                 <MenuItem value={11} primaryText="Inkwell" />
                 <MenuItem value={12} primaryText="Lofi" />
          </DropDownMenu>
            </Col>
          </Row>
        </Paper>
      </Col>
      <Col xs/>
    </Row>
    <Footer />
    </Grid>
  )
}
}

export default NotLoggedInHome;
