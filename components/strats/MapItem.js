import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, Image } from 'react-native'
import { Avatar } from 'react-native-elements'

export default class MapItem extends Component {

  constructor(props) {
    super(props)
  }

  render() {

    console.log(this.props.comps)

   
    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        style={styles.mapItem}
      >
        <Avatar
          styles={styles.image}
          size={60}
          rounded
          source={{uri: this.props.thumbnail}}
        />
        <View style={styles.stratInfos}>
          <View style={styles.mapInfos}>
            <Image 
              source={{uri: this.props.flagUrl}}
              style={styles.flag}
              resizeMode="contain"
            />
            <Text>{this.props.name}</Text>
          </View>
          <View>
            {this.props.defenseCompsNb ? 
              <Text>{this.props.attackCompsNb} Attack Comps - {this.props.defenseCompsNb} Defense Comps</Text>
            :
              <Text>{this.props.attackCompsNb} Comps</Text>
            }
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  flag: {
    width: 20,
    height: undefined,
    marginRight: 10
  },
  mapItem: {
    flexDirection: 'row',
    padding: 10,
  },
  image: {
  },
  mapInfos: {
    flexDirection:'row',
  },
  stratInfos: {
    marginLeft: 10,
    justifyContent: 'space-evenly',
  }


})
