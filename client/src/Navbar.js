import React, { Component } from 'react';
import { AppBar, IconMenu, MenuItem, IconButton } from 'material-ui';

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
            size={40}
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
      }
    };

    return (
      <div>
        <AppBar
          title="Bokeh"
          showMenuIconButton={false}
          iconElementRight={this.state.user.id ? <Logged user={this.state.user} logout={this.handleLogout}/> : (
            <div style={styles.inline}>
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
