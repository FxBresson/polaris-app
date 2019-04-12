import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, Avatar, Image } from 'react-native'

export default class MapItem extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate('Map', {
            mapId: this.props._id,
          });
        }}
      >
        <Avatar
          rounded
          source={{uri:props.image}}
        />
        <View>
          <View>
            <Image 
              source={{uri: this.props.flagUrl}}
            />
            <Text>{this.props.mapName}</Text>
          </View>
          <View>
            {this.props.defense ? 
              <Text>{this.props.attack} Attack Comps - {this.props.defense} Defense Comps</Text>
            :
              <Text>{this.props.attack} Comps</Text>
            }
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({})
