import React from 'react';
import { withGlobalContext } from '../../components/GlobalContext';
import {
  ScrollView,
  View,
  StyleSheet,
  FlatList
} from 'react-native';
import { Tabs } from '../../components/custom-elements';
import MapItem from '../../components/strats/MapItem';
import { ADD_STRAT } from '../../helpers/queries'

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

  async goToMapStrat(map) {
    let strat = this.props.global.lineup.strats.find(strat => strat.map === map._id)
    if(!strat) {
      //Add Strat
      await this.props.global.requester(ADD_STRAT, {map: map._id})
    }
    this.props.navigation.navigate('Map', {
      mapId: map._id,
      mapName: map.name
    });
  }

  render() {
    console.log(this.props.global)
    let mapsData = this.props.global.maps.filter(map => map.mapTypes.includes(this.state.mapType))
    

    return (
      <View style={styles.container}>

        <Tabs>
          <Tabs.Button
            title="Assault"
            selected={this.state.mapType === 'assault'}
            onPress={() => this.selectMapType('assault')}
          />
          <Tabs.Button
            title="Escort"
            selected={this.state.mapType === 'escort'}
            onPress={() => this.selectMapType('escort')}
          />
          <Tabs.Button
            title="Hybrid"
            selected={this.state.mapType === 'assaultEscort'}
            onPress={() => this.selectMapType('assaultEscort')}
          />
          <Tabs.Button
            title="Control"
            selected={this.state.mapType === 'control'}
            onPress={() => this.selectMapType('control')}
          />
        </Tabs>

        <FlatList
          data={mapsData}
          keyExtractor={this._keyExtractor}
          renderItem={({item}) => {
            let strat = this.props.global.lineup.strats.find(strat => strat.map === item._id)
            let comps = {
              attackCompsNb: strat && strat.comps.length ? strat.comps.filter(comp => !comp.isDefense).length : 0
            }
            if (this.state.mapType != 'control') {
              comps.defenseCompsNb = strat && strat.comps.length ? strat.comps.filter(comp => comp.isDefense).length : 0
            }
            return (
              <MapItem 
                {...item} 
                {...comps}
                onPress={() => this.goToMapStrat(item)} 
              />
            )
          }}
        />

      </View>
    );
  }
}

export default withGlobalContext(StratScreen)

const styles = StyleSheet.create({
    container: {
      paddingVertical: 10
    },
  });
  
