import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import axios from 'axios';
import { Redirect } from 'react-router'

//material-ui
import Paper from 'material-ui/Paper';

const CLOUDINARY_UPLOAD_PRESET = 'xkdglfme';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dyp2hzqpp/upload';


const style = {
  paperStyle: {
    height: 204,
    width: 204,
    textAlign: 'center',
    display: 'inline-block',
  },
  textStyle:{
    marginTop: '40%'
  },
  addMargin:{
    marginTop: '10vh'
  }
};


class ImageUpload extends Component {
  constructor(props) {
  super(props);

  this.state = {
    uploadedFile: null,
    uploadedFileCloudinaryUrl: ''
  };
}

onImageDrop(files) {
  this.setState({
    uploadedFile: files[0]
  });

  this.handleImageUpload(files[0]);
}

handleImageUpload(file) {
  let upload = request.post(CLOUDINARY_UPLOAD_URL)
                   .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                   .field('file', file);

  upload.end((err, response) => {
    if (err) {
      console.error(err);
    }

    if (response.body.secure_url !== '') {
      this.setState({
        uploadedFileCloudinaryUrl: response.body.secure_url
      }, function(){
        this.postUrl();
        this.props.liftUrl(response.body.secure_url)
      });
    }
  });
}

postUrl(){
  if(this.state.uploadedFileCloudinaryUrl !== ''){
    axios.post('/image/new', {
      user: this.props.user,
      src: this.state.uploadedFileCloudinaryUrl
    }).then(result => {
      this.props.changeIndex(1)
    })
  }
}

render() {
  return (
      <form style={style.addMargin}>
        <Paper style={style.paperStyle} zDepth={4}>
          <Dropzone
            onDrop={this.onImageDrop.bind(this)}
            multiple={false}
            accept="image/*">
            <div style={style.textStyle}>Drop an image or click to select a file to upload</div>
          </Dropzone>
        </Paper>
      </form>
  )
}
}

export default ImageUpload;
