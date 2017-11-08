import React, { Component } from 'react';
import ImageUpload from './ImageUpload';
import { Flex, Box } from 'reflexbox';
import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import FontIcon from 'material-ui/FontIcon';
import Edit from './Edit.js';
import Profile from '../Profile/Profile.js';
import axios from 'axios';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';

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
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: '80vw',
    height: '80vh',
    overflowY: 'auto',
  },
};


class Main extends Component {
  constructor(props) {
      super(props);
      this.state = {
        slideIndex: 0,
        value: '',
        unsplash: []
      };
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
    handleChange = (event) => {
      this.setState({value: event.target.value});
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
          <Flex align='center' wrap w={1}>
              <Box m='auto' align='center'>
                <h1> </h1>
              </Box>
          </Flex>
            <Flex align='center' wrap w={1}>
                <Box m='auto' w={205} align='center'>
                  <ImageUpload user={this.props.user} liftUrl={this.props.liftUrl} changeIndex={this.changeIndex}/>
                </Box>
            </Flex>
            <Flex align='center' wrap w={1}>
              <Box m='auto' auto align='center'>
                <form onSubmit={this.handleSubmit}>
                  <label>
                    <input type="text" value={this.state.value} onChange={this.handleChange} placeholder="search Unsplash for images" />
                  </label>
                  <input type="submit" value="Submit" />
                </form>
              </Box>
            </Flex>
            <Flex align='center' wrap w={1}>
              <Box m='auto' auto align='center'>
                    <div style={styles.root}>
                      <GridList
                        cellHeight={200}
                        style={styles.gridList}
                        >
                      {this.state.unsplash.map((tile, index) => (
                        <GridTile
                          key={index}
                          actionIcon={<IconButton><i class="fa fa-heart-o" aria-hidden="true"></i></IconButton>}
                        >
                          <img src={tile} />
                        </GridTile>
                      ))}
                    </GridList>
                  </div>

              </Box>
            </Flex>

          </div>
          <div style={styles.slide}>
            <Edit user={this.state.user} src={this.props.src}/>
          </div>
          <div style={styles.slide}>
          <Flex align='center' wrap w={1}>
              <Box auto>
                <Profile user={this.props.user}/>
              </Box>
          </Flex>
          </div>
        </SwipeableViews>

    </div>
  )
}
}

export default Main;
