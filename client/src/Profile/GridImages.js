import React, { Component } from 'react';
import axios from 'axios';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';

const styles = {
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

class GridImages extends Component {
  constructor(props){
    super(props)
    this.state = {
      tilesData: []
    }
  }
  componentDidMount(){
    axios.post('/image/grid', {
      user: this.props.user
    }).then(result =>{
      this.setState({
        tilesData:result.data.images
      })
    })
  }


  render() {
    return (
      <div style={styles.root}>
        <GridList
          cellHeight={200}
          style={styles.gridList}
          >
        {this.state.tilesData.map((tile, index) => (
          <GridTile
            key={index}
            actionIcon={<IconButton><i class="fa fa-heart-o" aria-hidden="true"></i></IconButton>}
          >
            <img src={tile} />
          </GridTile>
        ))}
      </GridList>
    </div>
    );
  }
}

export default GridImages;
