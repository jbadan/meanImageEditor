import React, { Component } from 'react';
import ImageUpload from './ImageUpload';
import axios from 'axios';
import MainHelpbox from './MainHelpbox';

import { Grid, Row, Col } from 'react-flexbox-grid';
import {grey500} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

const styles = {
  errorStyle: {
   color: grey500,
 },
 underlineStyle: {
   borderColor: grey500,
 },
  button:{
    margin: "12px"
  },
  imageDisplays:{
    maxHeight: '20vh'
  },
  addMargin:{
    marginTop: '5vh'
  }
};


class HomeTab extends Component {
  constructor(props) {
      super(props);
      this.state = {
        value: '',
        unsplash: []
      };
    }
    handleChangeText = (event) => {
      this.setState({
        value: event.target.value
      });
    }
    handleSubmit = (event) => {
      let unsplashResults = [];
     event.preventDefault();
     axios.post('/image/unsplash', {
       value: this.state.value
     }).then(result =>{
       for(let i=0; i<result.data.length; i++){
         unsplashResults.push(result.data[i].urls.regular)
       }
       this.props.liftUnsplash(unsplashResults);
      this.setState({
        unsplash: unsplashResults
      })
     })
   }

render() {
  return (

          <div>

          <MainHelpbox />

            <Row center="xs">
                <Col xs={6}>
                  <ImageUpload user={this.props.user} liftUrl={this.props.liftUrl} changeIndex={this.props.changeIndex}/>
                </Col>
            </Row>
            <Row center="xs">
              <Col xs={6}>
                <form style={styles.addMargin}>
                  <TextField
                      hintText="or search Unsplash for images"
                      hintStyle={styles.errorStyle}
                      inputStyle = {styles.errorStyle}
                      underlineStyle={styles.underlineStyle}
                       hintStyle={styles.errorStyle}
                      value={this.state.value}
                      onChange={this.handleChangeText}
                    />
                  <RaisedButton
                    label="Search"
                    secondary={true}
                    style={styles.button}
                    onClick={this.handleSubmit}
                    />
                </form>
              </Col>
            </Row>
            <Row center="xs">
              <Col xs>
                      {this.state.unsplash.map((tile, index) => (
                          <img style={styles.imageDisplays} key={index} src={tile} onClick={this.props.tileClick.bind(this, index)} />
                      ))}

              </Col>
            </Row>
    </div>
  )
}
}

export default HomeTab;
