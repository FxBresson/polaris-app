import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import Swiper from 'react-native-swiper';
import { Avatar } from 'react-native-elements';
import Colors from '../../constants/Colors';
import { Text, Icon } from '../custom-elements';

export default class StratPhase extends Component {

  constructor(props) {
    super(props)
  }


  render() {

    // let compsArray = this.props.comps;
    const comps = this.props.comps.map((comp, i) => {
      return (
        <View style={styles.slide} key={i}>
          <View style={styles.compTitle}><Text>{comp.name}</Text></View>
          <View style={styles.compLine}>
            {comp.characters.map((charac, j) => {
              return (
                <TouchableOpacity style={styles.charac} key={j} onPress={() => this.props.updateCharacter(comp._id, j)}>
                  {charac === null ?
                    <View  
                      style={[styles.characAvatar, styles.addCharacBtn]}
                    >
                      <Text h2 bold>+</Text>
                    </View>
                  :
                    <Image 
                      source={{uri:this.props.charactersList.find(c => c._id === charac).img}}
                      style={styles.characAvatar}
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
            style={[styles.characAvatar, styles.addCharacBtn]}
          >
            <Text h2 bold>+</Text>
          </TouchableOpacity>
        </View>
    )
    
    return (
      <View style={styles.phaseContainer}>
        <View style={styles.phaseNameContainer}>
          <Text bold>{this.props.phaseName}</Text>
        </View>
        <View style={styles.swiperWrapper}>
          <Swiper 
            showsButtons={true} 
            height={120}
            buttonWrapperStyle={{
              marginTop: 5,
              paddingVertical: 0,
              height: 30,
            }}
            paginationStyle={{
              bottom: 5,
            }}
            activeDotColor={Colors.white}
            nextButton={
              <Icon
                library={'SimpleLineIcons'}
                name={'arrow-right'}
                size={18}
              />
            }
            prevButton={
              <Icon
                library={'SimpleLineIcons'}
                name={'arrow-left'}
                size={18}
              />
            }
          >
            {[...comps, addCompSlide].map(i => i)}
          </Swiper>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  phaseContainer: {
    marginBottom: 20
  },
  phaseNameContainer: {
    backgroundColor: Colors.navyBlue,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingVertical: 5,
    paddingHorizontal: 20
  },
  swiperWrapper: {
    backgroundColor: Colors.opacityNavyBlue,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,

  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  compTitle: {
    height: 40,
    justifyContent: 'center'
  },
  compLine: {
    flex: 1,
    flexDirection: 'row'
  },
  characAvatar: {
    width: 50, 
    height: 50, 
    borderRadius: 50,
    marginRight: 5
  },
  addCharacBtn: {
    backgroundColor: Colors.navyBlue,
    justifyContent: 'center',
    alignItems: 'center'
  }

})
