import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import Swiper from 'react-native-swiper';
import { Avatar } from 'react-native-elements';

export default class StratPhase extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View>
        <Text>{this.props.phaseName}</Text>
          <Swiper style={styles.wrapper} showsButtons={true}>
            {this.props.comps.map((comp, i) => {
              return (
                <View style={styles.slide} key={i}>
                  <Text>{comp.name}</Text>
                  <View>
                    {comp.characters.map((charac, j) => {
                      return(
                        <Avatar
                          rounded
                          source={{uri:charac.img}}
                        />
                      )
                    })}
                  </View>
                </View>
              )
            })}
            <View style={styles.slide}>
              <TouchableOpacity
                
              >
                <Text>+</Text>
              </TouchableOpacity>
            </View>
        </Swiper>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
})
