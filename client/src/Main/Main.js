import React, { Component } from 'react';
import ImageUpload from './ImageUpload';
import Edit from './Edit.js';
import Profile from '../Profile/Profile.js';
import axios from 'axios';

import { Grid, Row, Col } from 'react-flexbox-grid';

import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
  slide: {
    padding: 10,
  },
  gridList: {
    width: '80vw',
    height: '80vh',
    overflowY: 'auto',
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


class Main extends Component {
  constructor(props) {
      super(props);
      this.state = {
        slideIndex: 0,
        value: '',
        unsplash: [],
        src: ''
      };
    }
    liftUrl = (data) => {
      this.setState({
        src: data
      })
    }

    handleChange = (value) => {
      this.setState({
        slideIndex: value,
      });
    };

    changeIndex = (data) => {
      this.setState({
        slideIndex: data
      });
    };
    tileClick = (index) =>{
      let newSrc = this.state.unsplash[index]
      axios.post('/image/new', {
        user: this.props.user,
        src: newSrc
      }).then(result => {
      this.setState({
        src: newSrc,
        slideIndex: 1
      })
    })
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
      this.setState({
        unsplash: unsplashResults
      })
     })
   }

render() {
  return (
    <div>
        <Tabs
          onChange={this.handleChange}
          value={this.state.slideIndex}
        >
          <Tab icon={<i className="fa fa-home" aria-hidden="true"></i>} label="HOME" value={0} />
          <Tab icon={<i className="fa fa-pencil" aria-hidden="true"></i>} label="EDIT" value={1} />
          <Tab icon={<i className="fa fa-heart" aria-hidden="true"></i>} label="YOUR UPLOADS" value={2} />
        </Tabs>
        <SwipeableViews
          index={this.state.slideIndex}
          onChangeIndex={this.handleChange}
          >
          <div>
            <Row center="xs">
                <Col xs={6}>
                  <ImageUpload user={this.props.user} liftUrl={this.liftUrl} changeIndex={this.changeIndex}/>
                </Col>
            </Row>
            <Row center="xs">
              <Col xs={6}>
                <form style={styles.addMargin}>
                  <TextField
                      hintText="or search Unsplash for images"
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
                          <img style={styles.imageDisplays} key={index} src={tile} onClick={this.tileClick.bind(this, index)} />
                      ))}

              </Col>
            </Row>

          </div>
          <div style={styles.slide}>
            <Edit user={this.state.user} src={this.state.src}/>
          </div>
          <div style={styles.slide}>
          <Row>
              <Col>
                <Profile user={this.props.user}/>
              </Col>
          </Row>
          </div>
        </SwipeableViews>

    </div>
  )
}
}

export default Main;
