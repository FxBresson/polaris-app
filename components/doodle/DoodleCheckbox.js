import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'

export default class DoodleCheckbox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      status: this.props.dispoState
    }
  }

  toggleStatus() {
    let newStatus = null
    if(!this.state.satus) {
      newStatus = true
    } else if (this.state.status) {
      newStatus = null
    } else if (this.state.status == null) {
      newStatus = false
    }
    // this.setState({status: newStatus})
    this.props.onStateChange(newStatus)
  }


  render() {
    return (
        <TouchableOpacity
            onPress={() => {
              this.toggleStatus()

            }}
        >
            <View><Text>{JSON.stringify(this.state.status)}</Text></View>
        </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({})
