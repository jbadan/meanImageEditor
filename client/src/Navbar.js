import React, { Component } from 'react';
import { AppBar, IconMenu, MenuItem, IconButton } from 'material-ui';
import FontIcon from 'material-ui/FontIcon';

import {
  amber300,
  grey50,
} from 'material-ui/styles/colors';
import {
  BrowserRouter as Router,
  Redirect, Link
} from 'react-router-dom';
import Signup from './Auth/Signup';
import Login from './Auth/Login';

import {FlatButton } from 'material-ui';
import Avatar from 'material-ui/Avatar';



const Logged = (props) => {
  let userName = props.user.name;
  let letter = userName.toUpperCase().charAt(0);
  return (
    <div style={{color: 'black'}}>

      <IconMenu
        {...props}
        iconButtonElement={
          <div>
          <IconButton>
          <Avatar
            size={35}
            color={amber300}
            backgroundColor={grey50}
          >
          {letter}
          </Avatar>
          </IconButton>
          </div>
        }
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      >
        <MenuItem primaryText="Sign out" onClick={props.logout}/>
      </IconMenu>
    </div>
  )
};

Logged.muiName = 'IconMenu';

class Navbar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: props.user,
      token: props.lift
    }
  }
  componentWillReceiveProps = (nextProps) => {
    this.setState({user: nextProps.user})
  }


  handleLogout = (e) => {
    e.preventDefault()
    localStorage.removeItem('mernToken')
    this.props.logout()
  }

  render() {
    const styles = {
      inline:{
        display: "inline-block"
      },
      icon:{
        marginTop: 10
      }
    };

    return (
      <div>
        <AppBar
          title="Bokeh"
          showMenuIconButton={true}
          iconElementLeft={<FontIcon
                              className="fa fa-cubes"
                              style={styles.icon}

                          />}
          iconElementRight={this.state.user.id ? <Logged user={this.state.user} logout={this.handleLogout}/> : (
            <div>
                <Signup lift={this.props.lift} primary={false}/>
                <Login lift={this.props.lift}/>
            </div>

          )}
        />
      </div>
    );
  }
}

export default Navbar;
