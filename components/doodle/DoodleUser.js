import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import moment from 'moment'
import DoodleLine from './DoodleLine';
moment.locale('fr')



export default class DoodleUser extends Component {

  constructor(props) {
    super(props)
  }

  updateDoodle(newStatus, dayOfWeek) {
    
  }

  render() {
    return (
      <View>
        <Text>S{this.props.weekNumber}</Text>
        {moment.weekdaysMin().map((i, dayName) => {
          return (
            <Text key={i}>{dayName}</Text>
          )
        })}
        <DoodleLine 
          name={this.props.name}
          weekDispo={this.props.weekDispo}
          onStateChange={(newStatus, index) => this.updateDoodle(newStatus, index)}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({})
