import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import Colors from '../../constants/Colors';

export default class DoodleCheckbox extends Component {
  constructor(props) {
    super(props)

    this.styles = StyleSheet.create({
      checkboxTouchableZone: {
        height: this.props.touchable ? 40 : 'auto',
        width: 40,
        justifyContent: 'center',
        alignItems: 'center'
      },
      checkboxDefault: {
        height: 20,
        width: 20,
        borderWidth: 1,
        borderColor: Colors.white,
        borderStyle: 'solid',
        borderRadius: 20
      },
      yes: {
        backgroundColor: Colors.checkboxYes
      },
      no: {
        backgroundColor: 'transparent'
      },
      maybe: {
        backgroundColor: Colors.checkboxMaybe
      }
    
    })
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
      checkboxStyle = StyleSheet.flatten([this.styles.checkboxDefault, this.styles.no])  
    } else if (this.props.dispoState === 1) {
      checkboxStyle = StyleSheet.flatten([this.styles.checkboxDefault, this.styles.yes])  
    } else if (this.props.dispoState === 2) {
      checkboxStyle = StyleSheet.flatten([this.styles.checkboxDefault, this.styles.maybe])  
    }

    return (
        this.props.touchable ? 
          <TouchableOpacity
              onPress={() => this.toggleStatus()}
              style={this.styles.checkboxTouchableZone}
          >
            <View style={checkboxStyle}></View>
          </TouchableOpacity>
        :
          <View style={this.styles.checkboxTouchableZone}>
            <View style={checkboxStyle}></View>
          </View>
    )

  }
}


