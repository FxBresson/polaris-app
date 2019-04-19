import React from 'react';
import { withGlobalContext } from '../../components/GlobalContext';
import {
  ScrollView,
  View,
  StyleSheet,
  FlatList
} from 'react-native';
import TabButton from '../../components/TabButton';
import MapItem from '../../components/strats/MapItem';

class StratScreen extends React.Component {
  static navigationOptions = {
    title: 'Strats',
  };

  constructor(props) {
    super(props)
    this.state = {
      mapType: 'assault'
    }
  }

  _keyExtractor = (item, index) => item._id;

  selectMapType(mapType) {
    this.setState({mapType: mapType})
  }

  async goToMapStrat(mapId) {
    let strat = this.props.global.lineup.strats.find(strat => strat.map === mapId)
    if(!strat) {
      //Add Strat
      await this.props.global.addStrat(mapId)
    }
    this.props.navigation.navigate('Map', {
      mapId: mapId,
    });
  }

  render() {
    const mapsData = this.props.global.maps.filter(map => map.mapTypes.includes(this.state.mapType))

    return (
      <View style={styles.container}>

        <View>
          <TabButton
            title="Assault"
            selected={this.mapType === 'assault'}
            onPress={() => this.selectMapType('assault')}
          />
          <TabButton
            title="Escort"
            selected={this.mapType === 'escort'}
            onPress={() => this.selectMapType('escort')}
          />
          <TabButton
            title="Hybrid"
            selected={this.mapType === 'assaultEscort'}
            onPress={() => this.selectMapType('assaultEscort')}
          />
          <TabButton
            title="Control"
            selected={this.mapType === 'control'}
            onPress={() => this.selectMapType('control')}
          />
        </View>

        <FlatList
          data={mapsData}
          keyExtractor={this._keyExtractor}
          renderItem={({item}) => (
            <MapItem 
              {...item} 
              onPress={() => this.goToMapStrat(item._id)} 
            />
          )}
        />

      </View>
    );
  }
}

export default withGlobalContext(StratScreen)

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingTop: 80,
    },
  });
  
