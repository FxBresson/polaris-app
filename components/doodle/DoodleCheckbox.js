import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'

export default class DoodleCheckbox extends Component {
  constructor(props) {
    super(props)
  }

  toggleStatus() {
    let newStatus = 0
    if(this.props.dispoState === 0) {
      newStatus = 1
    } else if (this.props.dispoState === 1) {
      newStatus = 2
    } else if (this.props.dispoState === 2) {
      newStatus = 0
    }
    // this.setState({status: newStatus})
    this.props.onStateChange(newStatus)
  }



  render() {
    let checkboxStyle = []
    if(this.props.dispoState === 0) {
      checkboxStyle = StyleSheet.flatten([styles.checkboxDefault, styles.no])  
    } else if (this.props.dispoState === 1) {
      checkboxStyle = StyleSheet.flatten([styles.checkboxDefault, styles.yes])  
    } else if (this.props.dispoState === 2) {
      checkboxStyle = StyleSheet.flatten([styles.checkboxDefault, styles.maybe])  
    }

    return (
        this.props.touchable ? 
          <TouchableOpacity
              onPress={() => this.toggleStatus()}
          >
              <View style={checkboxStyle}></View>

          </TouchableOpacity>
        :
          <View style={checkboxStyle}></View>
    )

  }
}

const styles = StyleSheet.create({
  checkboxDefault: {
    height: 20,
    width: 20,
    borderWidth: 1,
    borderColor: '#000',
    borderStyle: 'solid',
    borderRadius: 20
  },
  yes: {
    backgroundColor: '#00FF00'
  },
  no: {
    backgroundColor: '#FF0000'
  },
  maybe: {
    backgroundColor: '#FFFF00'
  }

})
