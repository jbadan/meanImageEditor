import React, { Component } from 'react';
import ImageUpload from './ImageUpload';
import { Flex, Box } from 'reflexbox';





class Main extends Component {


render() {
  return (
    <Flex
      align='center'
	    wrap
	    w={1}
	   >

        <Box m='auto' w={205} align='center'>
          <ImageUpload />
        </Box>
    </Flex>
  )
}
}

export default Main;
