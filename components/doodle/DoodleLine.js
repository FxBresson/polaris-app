import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import DoodleCheckbox from './DoodleCheckbox';

export default class DoodleLine extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View>
        <Text>{this.props.name}</Text>
        {this.props.weekDispo.map((i, dispo) => {
          <DoodleCheckbox
            key={i}
            dispoState={dispo}
            onStateChange={(newStatus) => this.props.onStateChange(newStatus, i)}
          />
        })}
      </View>
    )
  }
}

const styles = StyleSheet.create({})
