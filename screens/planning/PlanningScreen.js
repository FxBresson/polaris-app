import React from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  FlatList,
  Button,
  TextInput,
  Picker
} from 'react-native';
import moment from 'moment'
moment.locale('fr')
import { withGlobalContext } from '../../components/GlobalContext'
import MatchItem from '../../components/matchs/MatchItem';
import { Overlay } from 'react-native-elements';
import TabButton from '../../components/TabButton';
import DoodleUser from '../../components/doodle/DoodleUser';
import DoodleTeam from '../../components/doodle/DoodleTeam';
import { Formik } from 'formik';
import { UPDATE_PLAYER } from '../../helpers/queries'
import DatePicker from 'react-native-datepicker'
import { CREATE_MATCH } from '../../helpers/queries'


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

  goToMatch(item) {
      this.props.navigation.navigate('Match', {
        match_id: item
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
          windowBackgroundColor="rgba(255, 255, 255, .5)"
          width="auto"
          height="auto"
          onBackdropPress={() => this.setState({ isOverlayVisible: false })}
        >
          <Formik
            initialValues={{ date: moment().set({hour:21,minute:0,second:0,millisecond:0}), type: 'Scrim'}}
            onSubmit={values => this.createNewMatch(values)}
          >
            {props => (
              <View>
                <DatePicker
                  style={{width: 200}}
                  date={props.values.date}
                  mode="datetime"
                  placeholder="Select date"
                  format="DD-MM-YYYY hh:mm"
                  is24Hour={true}
                  minDate="03-02-2018"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  customStyles={{
                    dateIcon: {
                      position: 'absolute',
                      left: 0,
                      top: 4,
                      marginLeft: 0
                    },
                    dateInput: {
                      marginLeft: 36
                    }
                    // ... You can check the source to find the other keys.
                  }}
                  onDateChange={props.handleChange('date')}
                />

                <Picker
                  selectedValue={props.values.type}
                  style={{height: 50, width: 100}}
                  onValueChange={props.handleChange('type')}
                > 
                  <Picker.Item label="Scrim" value="Scrim" />
                  <Picker.Item label="Tournament" value="Tournament" />
                  <Picker.Item label="Ranked" value="Ranked" />
                </Picker>

                <Button onPress={props.handleSubmit} title="Submit" />
              </View>
            )}
          </Formik>
        </Overlay>

        <View>
          <View>
            <Text>Mes disponibilités</Text>
            <DoodleUser 
              weekNumber={date.week()}
              name={this.props.global.user.name}
              weekIndex={7}
              weekAvailability={this.props.global.user.doodle.slice(7, 14)}
              updateDoodle={(newStatus, i) => this.updateDoodle(newStatus, i)}
            />
            <DoodleTeam 
              teamValue={thisWeekTeamValue}
            />  
          </View>  

          <View>
            <DoodleUser 
              weekNumber={(date.week()+1)}
              name={this.props.global.user.name}
              weekIndex={14}
              weekAvailability={this.props.global.user.doodle.slice(14, 21)}
              updateDoodle={(newStatus, i) => this.updateDoodle(newStatus, i)}
            />
            <DoodleTeam 
              teamValue={nextWeekTeamValue}
            />  
          </View>    
          
        </View>

        <View>
          <TabButton
            title="Prochains Matchs"
            selected={!this.state.isMatchListHistory}
            onPress={() => this.matchDataHistory(false)}
          />
          <TabButton
            title="Matchs passés"
            selected={this.state.isMatchListHistory}
            onPress={() => this.matchDataHistory(true)}
          />
        </View>

        <FlatList
          data={matchsData}
          renderItem={({item}) => <MatchItem {...item} goToMatch={() => this.goToMatch(item._id)} />}
          keyExtractor={(item, index) => item._id}
        />

        {!this.state.isMatchListHistory &&
          <Button
            title="+"
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
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 80,
  },
});
  
