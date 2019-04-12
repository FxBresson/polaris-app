import React from 'react';
import { withGlobalContext } from '../../components/GlobalContext'
import {
  ScrollView,
  StyleSheet,
  Image
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
    return (
      <View style={styles.container}>
        <Image
          source={{ uri: this.props.map.img }}
        />

        <View>
          <Text>{this.props.map.name}</Text>
          <Text>{this.props.comment}</Text>
        </View>

        <StratPhase
          phaseName="Attack"
          comps={this.props.compAttack}
        />

        <StratPhase
          phaseName="Defense"
          comps={this.props.compDefense}
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
  });
  
