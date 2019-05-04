import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '../custom-elements';
import DoodleCheckbox from './DoodleCheckbox';

export default class DoodleLine extends Component {

  constructor(props) {
    super(props)

    this.styles = StyleSheet.create({
      line: {
        flexDirection: 'row',
      },
      name: {
        flex: 2,
        height: this.props.touchable ? 40 : 30,
        justifyContent: 'center',
        paddingLeft: 10,
        borderRightWidth: 1,
        borderRightColor: 'black',
      },
      nameText: {
        fontSize: 12
      }
    })
  }

  render() {
    return (
      <View style={this.styles.line}>
        <View style={this.styles.name}><Text italic style={this.styles.nameText}>{this.props.name}</Text></View>
        {this.props.weekAvailability.map((dispo, i) => {
          return (
            <DoodleCheckbox
              touchable={this.props.touchable}
              key={i}
              dispoState={dispo}
              onStateChange={(newStatus) => this.props.onStateChange(newStatus, (i+this.props.weekIndex))}
            />
          )
        })}
      </View>
    )
  }
}

