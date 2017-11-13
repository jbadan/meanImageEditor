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
    let noUploads = <h3/>;
    let saved = <h3> Your Saved Edits </h3>
    let original = <h3> Original Uploads </h3>
    if(this.state.tilesData.length === 0 && this.state.editedData.length === 0){
      noUploads =  <h3> You have not uploaded or saved any images. Visit the Home tab to get started! </h3>
      saved = <h3/>
      original = <h3/>
    }else if(this.state.tilesData.length === 0){
      original = <h3/>
    }else if(this.state.editedData.length === 0){
      saved = <h3/>
    }
    return (
      <Row>
      <Col xs={12}>
        <Row center="xs">
          <Col xs>
            {noUploads}
          </Col>
        </Row>
        <Row center="xs">
          <Col xs>
            {saved}
                  {this.state.editedData.map((tile, index) => (
                      <img style={styles.imageDisplays} key={index} src={tile} onClick={this.tileClick.bind(this, index)} />
                  ))}
          </Col>
        </Row>
          <Row center="xs">
            <Col xs>
              {original}
                    {this.state.tilesData.map((tile, index) => (
                        <img style={styles.imageDisplays} key={index} src={tile} onClick={this.tileClick.bind(this, index)} />
                    ))}

            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

export default GridImages;
