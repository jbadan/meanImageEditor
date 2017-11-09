import React, { Component } from 'react';
import {
BrowserRouter,
Route,
Link,
Switch
} from 'react-router-dom'
import './App.css';
import Main from './Main/Main';
import Navbar from './Navbar';
import NotFound from './NotFound';
import Profile from './Profile/Profile';
import NotLoggedInHome from './NotLoggedInHome';
import Edit from './Main/Edit';
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
    let switchStatement = '';
    if (Object.keys(this.state.user).length === 0) {
       switchStatement =
        <Switch>
          <Route exact path="/" render={() => <NotLoggedInHome />} />
          <Route path="*" render={NotFound} status={404} />
        </Switch>
    } else {
       switchStatement =
        <Switch>
          <Route exact path="/" render={() => <Main user={this.state.user}
                                                    lift={this.liftTokenToState}
                                              />} />
          <Route path="*" render={NotFound} status={404} />
        </Switch>
    }
      return (
        <div>
        <BrowserRouter>
          <div>
          <Navbar user={this.state.user} lift={this.liftTokenToState} logout={this.logout} />
            {switchStatement}
          </div>
        </BrowserRouter>
      </div>
      );
    }
}

export default App;
