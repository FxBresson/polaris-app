import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import moment from 'moment';
import 'moment/locale/fr';
import DoodleLine from './DoodleLine';
import Colors from '../../constants/Colors';
import { Text } from '../custom-elements';

export default class DoodleUser extends Component {
  constructor(props) {
    super(props)
  }

  render() {

    return (
      <View style={styles.doodleUserContainer}>
        <View style={styles.line}>
          <View style={styles.weekNumberContainer}><Text bold style={styles.weekNumber}>S{this.props.weekNumber}</Text></View>
          {moment.weekdaysMin(true).map((dayName, i) => {
            return (
              <Text bold key={i} style={styles.dayName}>{dayName}</Text>
            )
          })}
        </View>
        <DoodleLine 
          touchable={true}
          name={'Mes dispos'}
          weekIndex={this.props.weekIndex}
          weekAvailability={this.props.weekAvailability}
          onStateChange={(newStatus, i) => this.props.updateDoodle(newStatus, i)}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  doodleUserContainer: {
    backgroundColor: Colors.opacityNavyBlue,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 10
  },
  line: {
    flexDirection: 'row',
    alignItems: 'center'

  },
  dayName: {
    width: 40,
    textAlign: 'center',
    textTransform: 'capitalize'
  },
  weekNumberContainer: {
    flex: 2,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center'
  },
  weekNumber: {
    backgroundColor: Colors.opacityNavyBlue,
    borderRadius: 25,
    paddingVertical: 4,
    paddingHorizontal: 10
  }
})
