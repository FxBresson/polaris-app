import React from 'react';
import { withGlobalContext } from '../../components/GlobalContext'
import {
  View,
  ScrollView,
  StyleSheet,
  TextInput,
  Picker,
} from 'react-native';
import { Tile, Image } from 'react-native-elements';
import { Formik } from 'formik';
import { UDPDATE_MATCH } from '../../helpers/queries';
import Colors from '../../constants/Colors';

import { Text, Button, Overlay } from '../../components/custom-elements';

import moment from 'moment';
import 'moment/locale/fr';

class MatchScreen extends React.Component {
  static navigationOptions = ({navigation}) => {
    const { params = {} } = navigation.state
    return {
      title: 'Détail du match',
      headerRight: (
        <Button
          onPress={() => params.toggleEditMode()}
          style={{backgroundColor: Colors.denimBlue}}
        >
          <Text>{params.editingMode ? 'done' : 'edit'}</Text>
        </Button>
      ),
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      isOverlayVisible: false,
      matchTemp: {}
    }
  }

  toggleEditMode() {
    editingMode = this.state.editingMode
    if (editingMode && Object.entries(this.state.matchTemp).length) {
      matchTemp = this.state.matchTemp;
      matchTemp.sr = JSON.parse(matchTemp.sr)
      let newMatchObj = {
        _id: this.props.navigation.getParam('match_id'),
        ...matchTemp
      }
      try {
        this.props.global.requester(UDPDATE_MATCH, newMatchObj)
      } catch (err) {
        console.warn(err)
      }
    }
    this.props.navigation.setParams({
      editingMode: !editingMode
    })
    this.setState({editingMode: !editingMode, matchTemp: {}})
  }

  componentDidMount() {
    this.props.navigation.setParams({
      toggleEditMode: () => this.toggleEditMode(),
    })
  }

  addMap(values) {
    this.setState({ isOverlayVisible: false })
    const match_id = this.props.navigation.getParam('match_id');
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
          onBackdropPress={() => this.setState({ isOverlayVisible: false })}
        >
          <Formik
            initialValues={{ score: '', enemyScore: '', map: '' }}
            onSubmit={values => this.addMap(values)}
          >
            {props => (
              <View>
                <Picker
                  selectedValue={props.values.map}
                  itemStyle={{color: Colors.textColor}}
                  style={{height: 50, width: 20, color: Colors.textColor}}
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
                  placeholder={'0'}
                />
                <TextInput
                  onChangeText={props.handleChange('enemyScore')}
                  onBlur={props.handleBlur('enemyScore')}
                  value={props.values.enemyScore}
                  maxLength={2}
                  keyboardType={'numeric'}
                  placeholder={'0'}
                />
                <Button onPress={props.handleSubmit}>
                  <Text>Submit</Text>
                </Button>
              </View>
            )}
          </Formik>
        </Overlay>

        <View style={styles.matchInfos}>
          <Text h2>{moment(match.date).format('D MMM - HH:mm')}</Text>
          <Text h2>{match.type}</Text>
        </View>

        <View style={styles.matchScoreContainer}>
          <View style={styles.scoreContainer}>
            <Text h2 italic>{match.teamSr}</Text>
            <Text bold style={styles.matchScoreText}>{score}</Text>
          </View>
          <View style={styles.centralContainer}>
            <Text italic style={{fontSize: 36}}>VS</Text>
          </View>
          <View style={styles.scoreContainer}>
            {this.state.editingMode ?
              <TextInput
                value={this.state.matchTemp.sr !== undefined ? this.state.matchTemp.sr : JSON.stringify(match.sr)}
                onChangeText={(text) =>
                  this.setState({matchTemp: {
                    ...this.state.matchTemp,
                    sr: text
                }})}
                maxLength={4}
                keyboardType={'numeric'}
              />
              :
              <Text h2 italic>{match.sr}</Text>
            }
            <Text bold style={styles.matchScoreText}>{enemyScore}</Text>
          </View>
        </View>

        <View>
          
          
        </View>

        <View style={styles.mapsContainer}>
          {match.result.map((result, i) => {
            const map = this.props.global.maps.find((map) => map._id === result.map)

            return (
              <View key={i} style={styles.mapScoreContainer}>
                <View style={styles.scoreContainer}>
                  <Text style={styles.mapScoreText}>{result.score}</Text>
                </View>
                <View style={styles.centralContainer}>
                  <Image 
                    style={styles.mapImage}
                    source={{uri: map.thumbnail}}
                  />
                  <View style={styles.mapImageName}><Text style={styles.mapImageNameText}>{map.name}</Text></View>
                </View>
                <View style={styles.scoreContainer}>
                  <Text style={styles.mapScoreText}>{result.enemyScore}</Text>
                </View>
              </View>
            )
          })}
        </View>

        <Button
          style={styles.centralContainer}
          addButton
          onPress={() => this.setState({ isOverlayVisible: true })}
        />
      </View>
    );
  }
}

export default withGlobalContext(MatchScreen)

const styles = StyleSheet.create({
    container: {
      paddingVertical: 10,
      alignItems: 'center'
    },

    matchInfos: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderRadius: 25,
      backgroundColor: Colors.navyBlue,
      paddingVertical: 10,
      paddingHorizontal: 20,
      width: 270,
      marginBottom: 10
    },

    matchScoreContainer: {
      flexDirection: 'row',
      width: 300,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 10
    },
    matchScoreText: {
      fontSize: 48
    },

    mapScoreContainer: {
      flexDirection: "row",
      borderRadius: 25,
      height: 70,
      backgroundColor: Colors.opacityNavyBlue,
      width: 300,
      marginBottom: 10,
      justifyContent: 'center',
      alignItems: 'center'
    },

    scoreContainer: {
      flex: 1,
      alignItems: 'center',
    },
    centralContainer: {
      width: 111,
      alignItems: 'center',
    },

    mapImage: {
      position: 'relative',
      width: 111,
      height: 70
    },  
    mapImageName: {
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      position: 'absolute', 
      left: 0,
      right: 0,
      bottom: 0,
      paddingVertical: 5,
      alignItems: 'center',
      justifyContent: 'center'
    },  
    mapImageNameText: {
      textAlign: 'center'
    },
    
    mapScoreText: {
      fontSize: 36
    },
    
  });
  
