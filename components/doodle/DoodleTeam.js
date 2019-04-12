import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import DoodleLine from './DoodleLine';

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
        >
          <Text>L'équipe</Text>
        </TouchableOpacity>
        {this.state.isExpanded && 
          <View>
            {this.props.week.entries.map((i, entry) => {
              return (
                <DoodleLine 
                  key={i}
                  name={entry[0]}
                  weekDispo={entry[1]}
                />
              )
            })}
          </View>
        } 
       
      </View>
    )
  }
}

const styles = StyleSheet.create({})
