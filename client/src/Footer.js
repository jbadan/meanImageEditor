import React, { Component } from 'react';
import { AppBar, IconMenu, MenuItem, IconButton } from 'material-ui';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Divider from 'material-ui/Divider';
import {
  BrowserRouter as Router,
  Redirect, Link
} from 'react-router-dom';





class Footer extends Component {

  render() {
    const styles = {
      links:{
        color: "#3D3D3D",
        padding: 10,
        textDecoration: "none",
        fontSize: '1.2em',

      },
      row:{
        paddingTop: 20
      }
    };

    return (
      <Row style={styles.row}>
        <Divider />
        <Col xsOffset={9} xs={3}>
          <a style={styles.links} href="https://github.com/jbadan/meanImageEditor"><i className="fa fa-github" aria-hidden="true"></i></a>
          <a style={styles.links} href="www.jennabadanowski.com">Jenna Badanowski <i className="fa fa-copyright" aria-hidden="true"> 2017</i></a>
        </Col>
      </Row>
    );
  }
}

export default Footer;
