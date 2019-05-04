import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Text from '../Text';
import Colors from '../../../constants/Colors';

export default class TabButton extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        style={StyleSheet.flatten([styles.tab, this.props.selected ? styles.tabSelected : {}])}
      >
        <Text h3 style={StyleSheet.flatten([styles.text, this.props.selected ? styles.textSelected : {}])}>{this.props.title}</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  tab: {
    height: 38,
    paddingHorizontal: 12,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.navyBlue
  },  
  tabSelected: {
    backgroundColor: Colors.textColor
  },
  text: {

  },
  textSelected: {
    color: Colors.navyBlue
  }
})
