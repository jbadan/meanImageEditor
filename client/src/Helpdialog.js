import React, { Component } from 'react';
import { AppBar, IconMenu, MenuItem, IconButton } from 'material-ui';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {
  BrowserRouter as Router,
  Redirect, Link
} from 'react-router-dom';





class HelpDialog extends Component {
  constructor(props){
    super(props);
    this.state = {
      open: false
    }
  }
  //question dialog box open/close
  handleQuestionOpen = () => {
   this.setState({open: true});
 };
 handleQuestionClose = () => {
   this.setState({open: false});
 };


  render() {
    const style = {
      color: {
        color: '#FFFFFE'
      }
    };
    const actions = [
      <FlatButton
        label="Close"
        primary={true}
        onClick={this.handleQuestionClose}
      />,
    ];
    return (
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
    );
  }
}

export default HelpDialog;
