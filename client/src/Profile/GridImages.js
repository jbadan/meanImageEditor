import React, { Component } from 'react';
import axios from 'axios';

import { Grid, Row, Col } from 'react-flexbox-grid';
import IconButton from 'material-ui/IconButton';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

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
      editedData: [],
      open: false,
      selectedIndex: '',
      selectedData: ''
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
  handleTouchTap = (event, index, string) => {
    event.preventDefault();
    this.setState({
      open: true,
      anchorEl: event.currentTarget,
      selectedIndex: index,
      selectedData: string
    });
  };
  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  tileClick = () =>{
    let index = this.state.selectedIndex
    let newSrc =''
    if(this.state.selectedData === 'editedData'){
      newSrc = this.state.editedData[index]
    }else{
    newSrc = this.state.tilesData[index]
    }
    this.props.liftSrcToEdit(newSrc)
  }

  editedTileClick = (index) =>{
    let newSrc = this.state.editedData[index]
      this.props.liftSrcToEdit(newSrc)
    }

  downloadImage = () => {
    let index = this.state.selectedIndex
    let newSrc =''
    if(this.state.selectedData === 'editedData'){
      newSrc = this.state.editedData[index]
    }else{
    newSrc = this.state.tilesData[index]
    }
    window.open(newSrc)
  }

  deleteImage = () => {
    let index= this.state.selectedIndex
    let newSrc = ''
    if(this.state.selectedData === 'editedData'){
      newSrc = this.state.editedData[index]
    }else{
    newSrc = this.state.tilesData[index]
    }
    axios.post('/image/delete', {
      user: this.props.user,
      src: newSrc,
      editOrOriginal: this.state.selectedData,
      index: this.state.selectedIndex
    }).then(result => {
      this.setState({
        tilesData: result.data.images,
        editedData: result.data.edited
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
      <Popover
        open={this.state.open}
        anchorEl={this.state.anchorEl}
        anchorOrigin={{horizontal: 'left', vertical: 'top'}}
        targetOrigin={{horizontal: 'left', vertical: 'top'}}
        onRequestClose={this.handleRequestClose}
      >
        <Menu>
          <MenuItem primaryText="Edit"
                    onClick={this.tileClick.bind(this)}
           />
           <MenuItem primaryText="Download"
                     onClick={this.downloadImage.bind(this)}
           />
          <MenuItem primaryText="Delete"
                    onClick={this.deleteImage.bind(this)}
          />
        </Menu>
      </Popover>
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
                      <img style={styles.imageDisplays} key={index} src={tile} onClick={(event) => this.handleTouchTap(event, index, 'editedData')} />
                  ))}
          </Col>
        </Row>
          <Row center="xs">
            <Col xs>
              {original}
                    {this.state.tilesData.map((tile, index) => (
                        <img style={styles.imageDisplays} key={index} src={tile} onClick={(event) => this.handleTouchTap(event, index, 'tilesData')} />
                    ))}

            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

export default GridImages;
