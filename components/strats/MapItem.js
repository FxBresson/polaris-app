import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { Avatar } from 'react-native-elements';
import { Text } from '../custom-elements';
import Colors from '../../constants/Colors';


export default class MapItem extends Component {

  constructor(props) {
    super(props)
  }

  render() {
   
    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        style={styles.mapItem}
      >
        <Avatar
          containerStyle={styles.image}
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
            <Text bold>{this.props.name}</Text>
          </View>
          <View>
            {this.props.defenseCompsNb ? 
              <Text italic>{this.props.attackCompsNb} Attack Comps - {this.props.defenseCompsNb} Defense Comps</Text>
            :
              <Text italic>{this.props.attackCompsNb} Comps</Text>
            }
          </View>
        </View>
        <View style={styles.btn}>
          <Text h2>></Text>
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
    marginHorizontal: 10,
    marginBottom: 10,
    borderRadius: 25,
    backgroundColor: Colors.opacityNavyBlue,
    alignItems: 'stretch',
  },
  image: {
    margin: 10
  },
  mapInfos: {
    flexDirection:'row',
  },
  stratInfos: {
    flex: 2,
    justifyContent: 'space-evenly',
  },
  btn: {
    width: 48,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.opacityNavyBlue,
    borderBottomRightRadius: 25,
    borderTopRightRadius: 25,

  }


})
