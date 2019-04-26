import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import Swiper from 'react-native-swiper';
import { Avatar } from 'react-native-elements';

export default class StratPhase extends Component {

  constructor(props) {
    super(props)
  }


  render() {

    // let compsArray = this.props.comps;
    const comps = this.props.comps.map((comp, i) => {
      return (
        <View style={styles.slide} key={i}>
          <Text>{comp.name}</Text>
          <View style={styles.compLine}>
            {comp.characters.map((charac, j) => {
              return (
                <TouchableOpacity style={styles.charac} key={j} onPress={() => this.props.updateCharacter(comp._id, j)}>
                  {charac === null ?
                    <View  ><Text>+</Text></View>
                  :
                    <Avatar
                      style={styles.charac}
                      rounded
                      source={{uri:this.props.charactersList.find(c => c._id === charac).img}}
                    />
                  }
                </TouchableOpacity>
              )
            })}
          </View>
        </View>
      )
    })

    const addCompSlide = (
        <View style={styles.slide} key={comps.length}>
          <TouchableOpacity
            onPress={() => this.props.openOverlay()}
            style={styles.addCompBtn}
          >
            <Text>+</Text>
          </TouchableOpacity>
        </View>
    )
    
    return (
      <View style={styles.phaseContainer}>
        <Text>{this.props.phaseName}</Text>
          <Swiper style={styles.wrapper} showsButtons={true} height={100}>
            {[...comps, addCompSlide].map(i => i)}
          </Swiper>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  phaseContainer: {
    backgroundColor: 'lightblue',
    marginBottom: 20
  },
  wrapper: {
    
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addCompBtn: {
    width: 48,
    height: 48,
    backgroundColor: 'salmon',
    justifyContent: 'center',
    alignItems: 'center',
  },
  compLine: {
    flexDirection: 'row'
  },
  charac: {
    width: 40,
    height: 40,
    marginRight: 5
  }
})
