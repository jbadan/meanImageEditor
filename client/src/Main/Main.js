import React, { Component } from 'react';
import ImageUpload from './ImageUpload';
import Edit from './Edit.js';
import Profile from '../Profile/Profile.js';
import axios from 'axios';
import Footer from '../Footer';
import HomeTab from './HomeTab';

import { Grid, Row, Col } from 'react-flexbox-grid';
import {grey500} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

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
  errorStyle: {
   color: grey500,
 },
 underlineStyle: {
   borderColor: grey500,
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
        src: '',
        tilesData: [],
        editedData: []
      };
    }
    liftUrl = (data) => {
      this.setState({
        src: data
      })
    }

    handleChange = (value) => {
      axios.post('/image/grid', {
        user: this.props.user
      }).then(result =>{
        this.setState({
          tilesData:result.data.images,
          editedData: result.data.edited,
          slideIndex: value
        })
      })
    }


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
  liftSrcToEdit = (newSrc) => {
    this.setState({
      src: newSrc,
      slideIndex: 1
    })
  }
  liftUnsplash = (array) => {
    this.setState({
      unsplash: array
    })
  }
  liftDelete = (newTilesArray, newEditedArray) => {
    this.setState({
      tilesData: newTilesArray,
      editedData: newEditedArray
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

          <HomeTab user={this.props.user} liftUrl={this.liftUrl} changeIndex={this.changeIndex} tileClick={this.tileClick} liftUnsplash={this.liftUnsplash}/>

          <div style={styles.slide}>
            <Row center="xs">
              <Col xs>
                <Edit user={this.props.user} src={this.state.src}/>
              </Col>
            </Row>
          </div>
          <div style={styles.slide}>
          <Row center="xs">
              <Col xs>
                <Profile user={this.props.user} liftSrcToEdit={this.liftSrcToEdit} editedData={this.state.editedData} tilesData={this.state.tilesData} liftDelete={this.liftDelete}/>
              </Col>
          </Row>
          </div>
        </SwipeableViews>
        <Footer />
    </div>
  )
}
}

export default Main;
