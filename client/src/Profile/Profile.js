import React, { Component } from 'react';
import GridImages from './GridImages';

class Profile extends Component {
  render() {
    return (
      <div>
        <h1>  </h1>
        <GridImages user={this.props.user} liftSrcToEdit={this.props.liftSrcToEdit}/>
      </div>
    );
  }
}

export default Profile;
