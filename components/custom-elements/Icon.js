import React from 'react';
import { Icon } from 'expo';

import Colors from '../../constants/Colors';

export default class CustomIcon extends React.Component {
  render() {

    const Library = Icon[this.props.library]

    if (this.props.tabBarIcon) {
      return (
        <Library
          name={this.props.name}
          size={24}
          style={{ marginBottom: -3 }}
          color={this.props.focused ? Colors.tabSelected : Colors.tabDefault}
        />
      );
    } else {
      return (
        <Library
          name={this.props.name}
          size={this.props.size || 24}
          style={this.props.style}
          color={this.props.color || Colors.white}
        />
      );
    }
  }
}