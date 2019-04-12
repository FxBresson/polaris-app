import React, { Component } from 'react'
import { Text, StyleSheet, TouchableOpacity } from 'react-native'

export default class TabButton extends Component {
  render() {
    return (
      <TouchableOpacity
      onPress={props.onPress}
    >
      <Text>{props.title}</Text>
    </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({})
