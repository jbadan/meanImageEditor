import React, { Component } from 'react';
import GridImages from './GridImages';

class Profile extends Component {
  render() {
    return (
      <div>
        <h1> Profile page </h1>
        <GridImages user={this.props.user} />
      </div>
    );
  }
}

export default Profile;
