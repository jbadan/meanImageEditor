import React, { Component } from 'react';



import { Grid, Row, Col } from 'react-flexbox-grid';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

const styles = {
  color: {
    color: '#FFFFFE'
  }

};


class MainHelpbox extends Component {
  constructor(props) {
      super(props);
      this.state = {
        open: false,

      };
    }

   handleQuestionOpen = () => {
    this.setState({open: true});
  };
  handleQuestionClose = () => {
    this.setState({open: false});
  };


render() {
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
            <Row>
              <Col xsOffset={11} xs={1}>
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
                  <h3 style={styles.color}> What is Bokeh? </h3>
                  <p>Bokeh is the aesthetic quality of the blur produced in the out-of-focus parts of an image produced by a lens.</p>
                  <h3 style={styles.color}> How do I upload an image? </h3>
                  <p> You have options! Upload your own image by dragging and dropping it into the grey square or click on the square to navigate to your files.
                   You can also search Unsplash to find free stock images. </p>
                   <h3 style={styles.color}> How do I view my saved images? </h3>
                   <p> Navigate to "Your Uploads". Original uploads and saved edits are stored there. Simply click on an image to edit, download or delete. </p>
              </Dialog>
              </Col>
            </Row>
            </Col>
          </Row>

  )
}
}

export default MainHelpbox;
