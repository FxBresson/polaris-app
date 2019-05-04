import React from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  FlatList,
  TextInput,
  Picker,
} from 'react-native';
import moment from 'moment'
import 'moment/locale/fr';
import { withGlobalContext } from '../../components/GlobalContext'
import MatchItem from '../../components/matchs/MatchItem';
import DoodleUser from '../../components/doodle/DoodleUser';
import DoodleTeam from '../../components/doodle/DoodleTeam';
import { Formik } from 'formik';
import { UPDATE_PLAYER } from '../../helpers/queries';
import DatePicker from 'react-native-datepicker';
import { CREATE_MATCH } from '../../helpers/queries';

import Colors, { navyBlue } from '../../constants/Colors';

import { Text, Button, Overlay, Tabs } from '../../components/custom-elements';


class PlanningScreen extends React.Component {
  static navigationOptions = {
    title: 'Planning',
  };

  constructor(props) {
    super(props);
    this.state = {
      isMatchListHistory: false,
      isOverlayVisible: false
    }
  }

  matchDataHistory(isHistory) {
    this.setState({ isMatchListHistory: isHistory });
  }

  updateDoodle(newStatus, dayOfWeek) {
    let newUserObj = {
      _id: this.props.global.user._id,
      doodle: this.props.global.user.doodle
    }
    newUserObj.doodle[dayOfWeek] = newStatus
    this.props.global.requester(UPDATE_PLAYER, newUserObj)
  }

  createNewMatch(values) {
    this.setState({ isOverlayVisible: false })
    this.props.global.requester(CREATE_MATCH, {
      type: values.type,
      date: moment(values.date, "DD-MM-YYYY hh:mm")
    })

  }

  goToMatch(match) {
      this.props.navigation.navigate('Match', {
        match_id: match._id,
      });
  }

  render() {    
    const matchsData = this.state.isMatchListHistory ? this.props.global.lineup.matchHistory : this.props.global.lineup.matchSchedule
    const date = moment()

    let thisWeekTeamValue = this.props.global.lineup.players.map(player => ({
      name: player.name,
      doodle: player.doodle.slice(7, 14)
    }))
    let nextWeekTeamValue = this.props.global.lineup.players.map(player => ({
      name: player.name,
      doodle: player.doodle.slice(14, 21)
    }))

    return (
      <View style={styles.container}>
        <Overlay
          isVisible={this.state.isOverlayVisible}
          onBackdropPress={() => this.setState({ isOverlayVisible: false })}
        >
          <Formik
            initialValues={{ date: moment().set({hour:21,minute:0,second:0,millisecond:0}), type: 'Scrim'}}
            onSubmit={values => this.createNewMatch(values)}
          >
            {props => (
              <View>
                <Text bold style={styles.label}>{`Date & heure`}</Text>
                <DatePicker
                  style={{backgroundColor: Colors.textColor, marginBottom: 10}}
                  date={props.values.date}
                  showIcon={false}
                  mode="datetime"
                  placeholder="Select date"
                  format="DD-MM-YYYY HH:mm"
                  is24Hour={true}
                  minDate="03-02-2018"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"

                  onDateChange={props.handleChange('date')}
                />

                <Text bold style={styles.label}>Type</Text>
                <Picker
                  selectedValue={props.values.type}
                  itemStyle={{color: Colors.textColor}}
                  style={{height: 50, width: '100%', color: Colors.textColor}}
                  onValueChange={props.handleChange('type')}
                > 
                  <Picker.Item label="Scrim" value="Scrim" />
                  <Picker.Item label="Tournament" value="Tournament" />
                  <Picker.Item label="Ranked" value="Ranked" />
                </Picker>

                <Button onPress={props.handleSubmit}>
                  <Text>Submit</Text>
                </Button>
              </View>
            )}
          </Formik>
        </Overlay>

        <View>
          <View style={styles.doodleWeekContainer}>
            <DoodleUser 
              weekNumber={date.week()}
              weekIndex={7}
              weekAvailability={this.props.global.user.doodle.slice(7, 14)}
              updateDoodle={(newStatus, i) => this.updateDoodle(newStatus, i)}
            />
            <DoodleTeam 
              teamValue={thisWeekTeamValue}
            />  
          </View>  

          <View style={styles.doodleWeekContainer}>
            <DoodleUser 
              weekNumber={(date.week()+1)}
              weekIndex={14}
              weekAvailability={this.props.global.user.doodle.slice(14, 21)}
              updateDoodle={(newStatus, i) => this.updateDoodle(newStatus, i)}
            />
            <DoodleTeam 
              teamValue={nextWeekTeamValue}
            />  
          </View>    
          
        </View>

        <Tabs>
          <Tabs.Button
            title="Prochains Matchs"
            selected={!this.state.isMatchListHistory}
            onPress={() => this.matchDataHistory(false)}
          />
          <Tabs.Button
            title="Matchs passés"
            selected={this.state.isMatchListHistory}
            onPress={() => this.matchDataHistory(true)}
          />
        </Tabs>

        <FlatList
          data={matchsData}
          renderItem={({item}) => <MatchItem {...item} goToMatch={() => this.goToMatch(item)} />}
          keyExtractor={(item, index) => item._id}
        />

        {!this.state.isMatchListHistory &&
          <Button
            style={styles.addMatchButton}
            addButton
            onPress={() => this.setState({ isOverlayVisible: true })}
          />
        }

      </View>
    );
  }
}

export default withGlobalContext(PlanningScreen)

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10
  },
  doodleWeekContainer: {
    marginBottom: 10
  },
  label: {
    marginBottom: 5
  },
  addMatchButton: {
    width: '33%',
    alignSelf: 'center',
    marginTop: 20
  }
});
  
