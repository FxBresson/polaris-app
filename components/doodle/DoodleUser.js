import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import Text from '../Text';
import moment from 'moment';
import 'moment/locale/fr';
import DoodleLine from './DoodleLine';
import Colors from '../../constants/Colors';



export default class DoodleUser extends Component {

  constructor(props) {
    super(props)
  }


  render() {
    return (
      <View>
        <View style={styles.line}>
          <Text>S{this.props.weekNumber}</Text>
          {moment.weekdaysMin().map((dayName, i) => {
            return (
              <Text key={i}>{dayName}</Text>
            )
          })}
        </View>
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

const styles = StyleSheet.create({
  line: {
    flexDirection: 'row'
  }
})
