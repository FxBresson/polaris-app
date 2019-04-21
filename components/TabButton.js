import React, { Component } from 'react'
import { Text, StyleSheet, TouchableOpacity } from 'react-native'

export default class TabButton extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        style={ this.props.selected ? styles.selected : {} }
      >
        <Text>{this.props.title}</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  selected: {
    backgroundColor: 'lightblue'
  }
})
