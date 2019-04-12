import React from 'react';
import { withGlobalContext } from '../../components/GlobalContext';
import {
  ScrollView,
  StyleSheet,
} from 'react-native';
import TabButton from '../../components/TabButton';
import MapItem from '../../components/strats/MapItem';

class StratScreen extends React.Component {
  static navigationOptions = {
    title: 'Strats',
  };

  assaultEscort
  escort
  control

  constructor(props) {
    super(props)
    this.state = {
      mapType: 'assault'
    }
  }

  selectMapType(mapType) {
    this.setState({mapType: mapType})
  }

  render() {
    const mapsData = this.props.global.lineup.strats.filter(strat => strat.map.type === this.state.mapType)

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
          renderItem={
            ({map}) => (
              <MapItem {...map} />
            )
          }
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
  
