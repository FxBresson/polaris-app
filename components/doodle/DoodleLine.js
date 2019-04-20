import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import DoodleCheckbox from './DoodleCheckbox';

export default class DoodleLine extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={styles.line}>
        <Text>{this.props.name}</Text>
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

const styles = StyleSheet.create({
  line: {
    flexDirection: 'row'
  }
})
