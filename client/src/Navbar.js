import React, { Component } from 'react';
import { AppBar, Drawer, IconMenu, MenuItem, RaisedButton, IconButton, Toggle } from 'material-ui';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import {
  BrowserRouter as Router,
  Redirect, Link
} from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';

import {FlatButton } from 'material-ui';
import Avatar from 'material-ui/Avatar';


const buttonStyle= {
  verticalAlign: 'middle'
}

const Logged = (props) => {
  let userName = props.user.name;
  let letter = userName.toUpperCase().charAt(0);
  const style = {margin: 5};
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


  render() {

    return (
      <div>
        <AppBar
          title={<FlatButton
                containerElement={<Link to="/" />}
                linkButton={true}
                label={"Image Editor"}
                labelStyle={{ fontSize: '1em'}}
                />}
          //titleStyle={{textAlign: 'center'}}
          showMenuIconButton={false}
          iconElementRight={this.state.user.id ? <Logged user={this.state.user} signOut={this.props.logout}/> : (
            <div className='nav-buttons'>
              <div className='nav-button'>
                <Signup lift={this.props.lift} primary={false}/>
              </div>
              <div className='nav-button'>
                <Login lift={this.props.lift}/>
              </div>
            </div>

          )}
        />
      </div>
    );
  }
}

export default Navbar;
