import React, { Component } from 'react';
import ImageUpload from './ImageUpload';
import { Flex, Box } from 'reflexbox';
import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import FontIcon from 'material-ui/FontIcon';
import Edit from './Edit.js';

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
};

class Main extends Component {
  constructor(props) {
      super(props);
      this.state = {
        slideIndex: 0,
      };
    }

    handleChange = (value) => {
      this.setState({
        slideIndex: value,
      });
    };


render() {
  return (
    <div>
        <Tabs
          onChange={this.handleChange}
          value={this.state.slideIndex}
        >
          <Tab icon={<i className="fa fa-home" aria-hidden="true"></i>} label="HOME" value={0} />
          <Tab icon={<i className="fa fa-pencil" aria-hidden="true"></i>} label="EDIT" value={1} />
          <Tab icon={<i className="fa fa-heart" aria-hidden="true"></i>} label="FAVORITES" value={2} />
        </Tabs>
        <SwipeableViews
          index={this.state.slideIndex}
          onChangeIndex={this.handleChange}
          >
          <div>
            <Flex align='center' wrap w={1}>
                <Box m='auto' w={205} align='center'>
                  <ImageUpload user={this.props.user} liftUrl={this.props.liftUrl}/>
                </Box>
            </Flex>
          </div>
          <div style={styles.slide}>
            <Edit user={this.state.user} src={this.state.src}/>
          </div>
          <div style={styles.slide}>
            slide n°3
          </div>
        </SwipeableViews>

    </div>
  )
}
}

export default Main;
