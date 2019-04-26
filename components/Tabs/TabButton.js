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
        style={styles.tab}
      >
        <Text style={[styles.textStyle, this.props.selected ? styles.selected : {}]}>{this.props.title}</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  tab: {
    height: 48,
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'center'
  },  
  selected: {
    borderBottomColor: 'blue'
  },
  textStyle: {
    borderBottomWidth: 3,
    borderBottomColor: 'lightblue',
    paddingHorizontal: 8,
    paddingVertical: 4,
    

  }
})
