import React from 'react';
import { withGlobalContext } from '../../components/GlobalContext'
import {
  ScrollView,
  StyleSheet,
  Image,
  View,
  Text
} from 'react-native';
import StratPhase from '../../components/strats/StratPhase';

class MapScreen extends React.Component {
  static navigationOptions = {
    title: '',
  };

  constructor(props) {
    super(props)
    
  }

  

  render() {
    const mapId = this.props.navigation.getParam('mapId');
    const map = this.props.global.maps.find(map => map._id === mapId)
    let strat = this.props.global.lineup.strats.find(strat => strat.map === mapId)

    return (
      <View style={styles.container}>
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
        />

        {map.mapTypes.includes('escort')}
        <StratPhase
          phaseName="Defense"
          comps={strat.comps.filter(comp => comp.isDefense)}
        />
      </View>
    );
  }
}

export default withGlobalContext(MapScreen)

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingTop: 80,
    },
    hero: {
      flex: 1,
      width: undefined,
      height: undefined
    }
  });
  
