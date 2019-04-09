import React from 'react';
import { withGlobalContext } from '../../components/GlobalContext'
import {
  ScrollView,
  StyleSheet,
} from 'react-native';

class MatchScreen extends React.Component {
  static navigationOptions = {
    title: '',
  };

  render() {
    return (
      <ScrollView style={styles.container}>

      </ScrollView>
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
  });
  
