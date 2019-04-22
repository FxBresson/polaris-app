import React from 'react';
import { withGlobalContext } from '../../components/GlobalContext'
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  Button,
  TextInput,
  Picker
} from 'react-native';
import { Overlay, Tile } from 'react-native-elements';
import { Formik } from 'formik';
import { UDPDATE_MATCH } from '../../helpers/queries'

class MatchScreen extends React.Component {
  static navigationOptions = {
    title: '',
  };

  constructor(props) {
    super(props);
    this.state = {
      isOverlayVisible: false
    }
  }

  addMap(values) {
    this.setState({ isOverlayVisible: false })
    let match = [...this.props.global.lineup.matchHistory, ...this.props.global.lineup.matchSchedule].find(match => match._id === match_id)
    match.result.push({
      map: values.map,
      score: JSON.parse(values.score),
      enemyScore: JSON.parse(values.enemyScore)
    })
    this.props.global.requester(UDPDATE_MATCH, { _id: match._id, result: match.result })
  }


  render() {
    const match_id = this.props.navigation.getParam('match_id');
    const match = [...this.props.global.lineup.matchHistory, ...this.props.global.lineup.matchSchedule].find(match => match._id === match_id)
    let score = 0;
    let enemyScore = 0;
    for (const map of match.result) {
      if(map.score > map.enemyScore)
        score++
      if(map.score < map.enemyScore)
        enemyScore++
    }
    
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
            initialValues={{ score: '0', enemyScore: '0', map: '' }}
            onSubmit={values => this.addMap(values)}
          >
            {props => (
              <View>
                <Picker
                  selectedValue={props.values.map}
                  style={{height: 50, width: 200}}
                  onValueChange={props.handleChange('map')}
                > 
                  <Picker.Item label={"Select Map"} value={''} />
                  {this.props.global.maps.map((map, i) => {
                    return (
                      <Picker.Item key={map._id} label={map.name} value={map._id} />
                    )
                  })}
                </Picker>
                <TextInput
                  onChangeText={props.handleChange('score')}
                  onBlur={props.handleBlur('score')}
                  value={props.values.score}
                  maxLength={2}
                  keyboardType={'numeric'}
                />
                <TextInput
                  onChangeText={props.handleChange('enemyScore')}
                  onBlur={props.handleBlur('enemyScore')}
                  value={props.values.enemyScore}
                  maxLength={2}
                  keyboardType={'numeric'}
                />
                <Button onPress={props.handleSubmit} title="Submit" />
              </View>
            )}
          </Formik>
        </Overlay>

        <View>
          <Text>{match.date}</Text>
          <Text>{match.type}</Text>
        </View>

        <View>
          <View>
            <Text>{match.teamSr}</Text>
          </View>
          <Text>VS</Text>
          <View>
            <Text>{match.sr}</Text>
          </View>
        </View>

        <View>
          <Text>{score}</Text>
          <Text>{enemyScore}</Text>
        </View>

        {match.result.map((result, i) => {
          const map = this.props.global.maps.find((map) => map._id === result.map)

          return (
            <View key={i} style={styles.mapScore}>
              <Text>{result.score}</Text>
              <Tile
                imageSrc={{uri: map.thumbnail}}
                title={map.name}
                style={styles.mapImage}
                width={200}
                featured
              ></Tile>
              <Text>{result.enemyScore}</Text>
            </View>
          )
        })}

        <Button
            title="+"
            onPress={() => this.setState({ isOverlayVisible: true })}
        />
      </View>
    );
  }
}

export default withGlobalContext(MatchScreen)

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingTop: 80,
    },
    mapScore: {
      flexDirection: "row"
    },
  });
  
