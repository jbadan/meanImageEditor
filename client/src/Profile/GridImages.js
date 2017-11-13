import React, { Component } from 'react';
import axios from 'axios';

import { Grid, Row, Col } from 'react-flexbox-grid';
import IconButton from 'material-ui/IconButton';

const styles = {
  imageDisplays:{
    maxHeight: '20vh',
    padding: '10px'
  },
};


class GridImages extends Component {
  constructor(props){
    super(props)
    this.state = {
      tilesData: [],
      editedData: []
    }
  }
  componentDidMount(){
    axios.post('/image/grid', {
      user: this.props.user
    }).then(result =>{
      this.setState({
        tilesData:result.data.images,
        editedData: result.data.edited
      })
    })
  }
  tileClick = (index) =>{
    let newSrc = this.state.tilesData[index]
    axios.post('/image/redo', {
      user: this.props.user,
      src: newSrc
    }).then(result => {
    this.setState({
      src: newSrc
    })
  })
}

  render() {
    return (
      <div>
        <Row center="xs">
          <Col xs>
            <h3> Original Uploads </h3>
                  {this.state.tilesData.map((tile, index) => (
                      <img style={styles.imageDisplays} key={index} src={tile} onClick={this.tileClick.bind(this, index)} />
                  ))}

          </Col>
        </Row>
        <Row center="xs">
          <Col xs>
            <h3> Edited Uploads </h3>
                  {this.state.editedData.map((tile, index) => (
                      <img style={styles.imageDisplays} key={index} src={tile} onClick={this.tileClick.bind(this, index)} />
                  ))}

          </Col>
        </Row>
      </div>
    );
  }
}

export default GridImages;
