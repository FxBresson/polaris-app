import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import DoodleLine from './DoodleLine';
import Colors from '../../constants/Colors';
import { Text } from '../custom-elements';

export default class DoodleTeam extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isExpanded: false
    }
  }

  toggleTeamDispo() {
    this.setState({ isExpanded: !this.state.isExpanded })
  }

  render() {
    return (
      <View>
        <TouchableOpacity
          onPress={() => this.toggleTeamDispo()}
          style={[styles.teamBtn, this.state.isExpanded ? styles.teamBtnExpanded : {}]}
        >
          <Text>L'équipe</Text>
        </TouchableOpacity>
        {this.state.isExpanded && 
          <View style={styles.doodleTeamContainer}>
            {this.props.teamValue.map((player, i) => {
              return (
                <DoodleLine 
                  key={i}
                  name={player.name}
                  weekAvailability={player.doodle}
                />
              )
            })}
          </View>
        } 
       
      </View>
    )
  }
}

const styles = StyleSheet.create({
  teamBtn: {
    justifyContent:'center',
    alignItems: 'center',
    height: 30,
    backgroundColor: Colors.navyBlue,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25
  },
  teamBtnExpanded: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  doodleTeamContainer: {
    backgroundColor: Colors.opacityNavyBlue,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    paddingVertical: 10
  }
})
