import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'

export default class MatchItem extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <TouchableOpacity
        onPress={this.props.goToMatch}
      >
        <View>
          <View>
            <Text>{this.props.date}</Text>
            {this.props.sr &&
              <Text>{this.props.sr}</Text>
            }
          </View>
          <View>
            <Text>{this.props.type}</Text>
            {this.props.score &&
              <Text>{this.props.score}</Text>
            }
          </View>
        </View>
        <View></View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({})
