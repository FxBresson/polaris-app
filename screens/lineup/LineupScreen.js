import React from 'react';
import { withGlobalContext } from '../../components/GlobalContext'
import {
  View,
  StyleSheet,
} from 'react-native';

class LineupScreen extends React.Component {
  static navigationOptions = {
    title: 'Lineup',
  };

  render() {
    return (
      <View style={styles.container}>

      </View>
    );
  }
}

export default withGlobalContext(LineupScreen)

const styles = StyleSheet.create({
    container: {
      paddingVertical: 10
    },
  });
  
