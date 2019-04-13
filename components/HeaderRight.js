import React from 'react';
import { View, Button, Text, TouchableOpacity } from 'react-native';
import { withGlobalContext } from './GlobalContext'

// import { withNavigation } from 'react-navigation';

class HeaderRight extends React.Component {

  _handlelogout = () => {
    this.props.global.logout(this.props.navigation)
  }

  render() {
    return (
      <TouchableOpacity onPress={this._handlelogout}>
          <Text>LOGOUT</Text>
      </TouchableOpacity>
    );
  }
}


export default withGlobalContext(HeaderRight)