import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';

//material-ui
import Paper from 'material-ui/Paper';

const CLOUDINARY_UPLOAD_PRESET = 'xkdglfme';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dyp2hzqpp/upload';


const style = {
  height: 205,
  width: 205,
  textAlign: 'center',
  display: 'inline-block',
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
      });
    }
  });
}

render() {
  return (
      <form>
        <Paper style={style} zDepth={4}>
          <Dropzone
            onDrop={this.onImageDrop.bind(this)}
            multiple={false}
            accept="image/*">
            <div>Drop an image or click to select a file to upload.</div>
          </Dropzone>
        </Paper>
      </form>
  )
}
}

export default ImageUpload;
