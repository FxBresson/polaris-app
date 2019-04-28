import React from 'react';
import { withGlobalContext } from '../../components/GlobalContext'
import {
  ScrollView,
  StyleSheet,
  Image,
  View,
  Text,
  TextInput,
  Button,
  SectionList,
  TouchableOpacity
} from 'react-native';
import StratPhase from '../../components/strats/StratPhase';
import { Overlay, Avatar } from 'react-native-elements';
import { Formik } from 'formik';
import { UPDATE_STRAT } from '../../helpers/queries'

class MapScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('mapName'),
    }
  };

  constructor(props) {
    super(props)
    this.state = {
      isOverlayVisible: false,
      isOverlayCharacterVisible: false,
      updateCharacterData: {compId: null, index: null},
      isDefenseValue: null,
      mapId: this.props.navigation.getParam('mapId')
    }

    this.charactersData = this.generateCharacterDataList()
  }

  generateCharacterDataList() {
    let characters = {}
    let charactersData = []
    characters = this.props.global.characters.map(char => {
      char.roleName = char.role.name
      return char
    })
    characters = this.props.global.characters.reduce(function(rv, x) {
      (rv[x['roleName']] = rv[x['roleName']] || []).push(x);
      return rv;
    }, {})
    for (const key in characters) {
      if (characters.hasOwnProperty(key)) {
        charactersData.push({
          title: key, data: characters[key]
        })
      }
    }
    return charactersData
  }

  openOverlay(isDefense) {
    this.setState({ isOverlayVisible: true, isDefenseValue: isDefense })
  }


  addComp(values) {
    let isDefenseValue = this.state.isDefenseValue
    this.setState({ isOverlayVisible: false, isDefenseValue: null })
    let strat = this.props.global.lineup.strats.find(strat => strat.map === this.state.mapId)
    strat.comps.push({
      isDefense: isDefenseValue,
      name: values.compName,
      characters: new Array(6).fill(null)
    })
    this.props.global.requester(UPDATE_STRAT, { _id: strat._id, comps: strat.comps })
  }

  openOverlayCharacters(compId, index) {
    this.setState({isOverlayCharacterVisible: true, updateCharacterData: {compId: compId, index: index} })
  }

  updateCharacter(characterId) {
    let { compId, index } = this.state.updateCharacterData;
    this.setState({isOverlayCharacterVisible: false, updateCharacterData: {compId: null, index: null} })

    let strat = this.props.global.lineup.strats.find(strat => strat.map === this.state.mapId)
    let comps = strat.comps.map(comp => {
      if(comp._id === compId) {
        comp.characters[index] = characterId
      }
      return comp
    })
    this.props.global.requester(UPDATE_STRAT, { _id: strat._id, comps: comps })
  }

  

  render() {
    const map = this.props.global.maps.find(map => map._id === this.state.mapId)
    let strat = this.props.global.lineup.strats.find(strat => strat.map === this.state.mapId)
    
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
            initialValues={{ compName: '' }}
            onSubmit={values => this.addComp(values)}
          >
            {props => (
              <View>
                <TextInput
                  onChangeText={props.handleChange('compName')}
                  onBlur={props.handleBlur('compName')}
                  value={props.values.compName}
                  placeholder={'name'}
                />
                <Button onPress={props.handleSubmit} title="Submit" />
              </View>
            )}
          </Formik>
        </Overlay>

        <Overlay
          isVisible={this.state.isOverlayCharacterVisible}
          windowBackgroundColor="rgba(255, 255, 255, .5)"
          width="auto"
          height="auto"
          onBackdropPress={() => this.setState({ isOverlayCharacterVisible: false })}
        >
          <SectionList
            renderItem={({item, index, section}) => {
              return (
                <TouchableOpacity key={index} onPress={() => this.updateCharacter(item._id)}>
                  <Avatar
                      style={styles.charac}
                      rounded
                      source={{uri: item.img}}
                    />
                  <Text>{item.name}</Text>
                </TouchableOpacity>
              )
            }}
            renderSectionHeader={({section: {title}}) => (
              <Text style={{fontWeight: 'bold'}}>{title}</Text>
            )}
            sections={this.charactersData}
            keyExtractor={(item, index) => item._id + index}
          />
        </Overlay>

        <Image
          source={{ uri: map.thumbnail }}
          style={styles.hero}
          resizeMode="cover"
        />

        <View>
          <Text>{map.name}</Text>
          <Text>{strat.comments}</Text>
        </View>


        <StratPhase
          phaseName="Attack"
          comps={strat.comps.filter(comp => !comp.isDefense)}
          openOverlay={() => this.openOverlay(false)}
          updateCharacter={(compId, index) => this.openOverlayCharacters(compId, index)}
          charactersList={this.props.global.characters}
        />

        {!map.mapTypes.includes('control') &&
          <StratPhase
            phaseName="Defense"
            comps={strat.comps.filter(comp => comp.isDefense)}
            openOverlay={() => this.openOverlay(true)}
            updateCharacter={(compId, index) => this.openOverlayCharacters(compId, index)}
            charactersList={this.props.global.characters}
          />
        }
      </View>
    );
  }
}

export default withGlobalContext(MapScreen)

const styles = StyleSheet.create({
    container: {
      marginTop: -80
    },
    heroCover: {
    },
    hero: {
      flex: 1,
      width: undefined,
      height: undefined
    },
    charac: {
      width: 40,
      height: 40,
      marginRight: 5
    }
  });
  
