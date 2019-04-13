import React from 'react';
import {
  View,
  StyleSheet,
  Text
} from 'react-native';
import { withGlobalContext} from '../../components/GlobalContext'

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };

  constructor(props, navigation) {
    super(props);
    this.state = {
      dataSource: {}
    };
  }

  componentDidMount() {
  }

  render() {
    return (
      <View>

      </View>
    );
  }
}

export default withGlobalContext(HomeScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 80,
  }
});
