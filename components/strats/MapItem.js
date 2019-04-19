import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, Image } from 'react-native'
import { Avatar } from 'react-native-elements'

export default class MapItem extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <TouchableOpacity
        onPress={this.props.onPress}
      >
        <Avatar
          rounded
          source={{uri: this.props.thumbnail}}
        />
        <View>
          <View>
            <Image 
              source={{uri: this.props.flagUrl}}
              style={styles.flag}
              resizeMode="contain"
            />
            <Text>{this.props.name}</Text>
          </View>
          {/* <View>
            {this.props.defense ? 
              <Text>{this.props.attack} Attack Comps - {this.props.defense} Defense Comps</Text>
            :
              <Text>{this.props.attack} Comps</Text>
            }
          </View> */}
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  flag: {
    width: undefined,
    height: 25
  }
})
