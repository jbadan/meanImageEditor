import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link, Switch
} from 'react-router-dom';
import './App.css';
import Signup from './Signup';
import Main from './Main';
import Navbar from './Navbar';
import Login from './Login';
import Logout from './Logout';
import UserProfile from './UserProfile';
import NotFound from './NotFound';
import axios from 'axios';


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      token: '',
      user: {}
    }
  }

  liftTokenToState = (data) => {
    this.setState({token: data.token, user: data.user})
  }

  logout = ()=> {
    localStorage.removeItem('mernToken')
    this.setState({token: '', user: {}})
  }

  componentDidMount = () => {
    // If there is a token in localStorage
    var token = localStorage.getItem('mernToken')
    if (token === 'undefined' || token === null || token === '' || token === undefined) {
      localStorage.removeItem('mernToken')
      this.setState({
        token: '',
        user: {}
      })
    } else {
      //   Validate the token against the server
      axios.post('/auth/me/from/token', {
        token: token
      }).then(response => {
        //   Store the token and user
        localStorage.setItem('mernToken', response.data.token)
        this.setState({
          token: response.data.token,
          user: response.data.user
        })
        //   Pass User into child components and display main app
      }).catch(err => {
        // Both the JWT and db errors will be caught here
        console.log(err)
      })
    }
  }

  render() {
    var theUser = this.state.user
    if (typeof this.state.user === 'object' && Object.keys(this.state.user).length !== 0) {
      return (
        <div>
        <Router>
          <div>
            <Navbar user={this.state.user} lift={this.liftTokenToState} logout={this.logout} />
            <Switch>
              <Route exact path="/" render={() => <Main user={this.state.user} lift={this.liftTokenToState}/>} />
              <Route path="*" render={NotFound} status={404} />
            </Switch>
          </div>
        </Router>
      </div>
      );
    } else {
      return (
        <div>
        <Router>
          <div>
            <Navbar user={this.state.user} lift={this.liftTokenToState} logout={this.logout} />
            <Switch>
              <Route exact path="/" render={() => <Main user={this.state.user} lift={this.liftTokenToState}/>} />
              <Route path="*" render={NotFound} status={404} />
            </Switch>
          </div>
        </Router>
      </div>
      );
    }
  }
}

export default App;
