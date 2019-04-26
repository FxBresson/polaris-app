import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'

export default class TabButton extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={styles.tabContainer}>
        {this.props.children}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 10
  }
})
