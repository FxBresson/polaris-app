import React from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  FlatList,
  Button
} from 'react-native';
import moment from 'moment'
moment.locale('fr')
import { withGlobalContext } from '../../components/GlobalContext'
import MatchItem from '../../components/matchs/MatchItem';
import { Overlay } from 'react-native-elements';
import TabButton from '../../components/TabButton';
import DoodleUser from '../../components/doodle/DoodleUser';
import DoodleTeam from '../../components/doodle/DoodleTeam';


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

  addMatch() {
    this.setState({ isOverlayVisible: true })
  }

  updateDoodle(newStatus, dayOfWeek) {
    let newUserObj = {
      _id: this.props.global.user._id,
      doodle: this.props.global.user.doodle
    }
    newUserObj.doodle[dayOfWeek] = newStatus
    this.props.global.updatePlayerData(newUserObj)
  }

  render() {    
    const matchsData = this.state.isMatchListHistory ? this.props.global.lineup.matchHistory : this.props.global.lineup.matchSchedule
    const date = moment()

    let thisWeekTeamValue = this.props.global.lineup.players.map(player => ({
      mainBtag: player.mainBtag,
      doodle: player.doodle.slice(7, 14)
    }))
    let nextWeekTeamValue = this.props.global.lineup.players.map(player => ({
      mainBtag: player.mainBtag,
      doodle: player.doodle.slice(14, 21)
    }))

    console.log(this.props.global.user.doodle)

    return (
      <View style={styles.container}>

        <Overlay
          isVisible={this.state.isOverlayVisible}
          windowBackgroundColor="rgba(255, 255, 255, .5)"
          width="auto"
          height="auto"
          onBackdropPress={() => this.setState({ isOverlayVisible: false })}
        >
          <Text>This is Overlay</Text>
        </Overlay>

        <View>
          <View>
            <Text>Mes disponibilités</Text>
            <DoodleUser 
              weekNumber={date.week()}
              name={this.props.global.user.mainBtag}
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
              name={this.props.global.user.mainBtag}
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
            selected={!this.isMatchListHistory}
            onPress={() => this.matchDataHistory(false)}
          />
          <TabButton
            title="Matchs passés"
            selected={this.isMatchListHistory}
            onPress={() => this.matchDataHistory(true)}
          />
        </View>

        <FlatList
          data={matchsData}
          renderItem={
            ({match}) => (
              <MatchItem {...match} />
            )
          }
        />

        {!this.state.isMatchListHistory &&
          <Button
            title="+"
            onPress={() => this.addMatch()}
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
  
