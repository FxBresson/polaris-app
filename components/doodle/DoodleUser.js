import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import moment from 'moment'
import DoodleLine from './DoodleLine';
moment.locale('fr')



export default class DoodleUser extends Component {

  constructor(props) {
    super(props)
  }


  render() {
    return (
      <View>
        <Text>S{this.props.weekNumber}</Text>
        {moment.weekdaysMin().map((dayName, i) => {
          return (
            <Text key={i}>{dayName}</Text>
          )
        })}
        <DoodleLine 
          touchable={true}
          name={this.props.name}
          weekIndex={this.props.weekIndex}
          weekAvailability={this.props.weekAvailability}
          onStateChange={(newStatus, i) => this.props.updateDoodle(newStatus, i)}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({})
