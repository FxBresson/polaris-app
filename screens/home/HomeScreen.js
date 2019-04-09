import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text
} from 'react-native';
import { withGlobalContext} from '../../components/GlobalContext'

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };

  constructor(props, navigation) {
    console.log(navigation)
    super(props);
    this.state = {
      dataSource: {}
    };
  }

  componentDidMount() {
    //this.fetchSecret()
  }

 

  render() {
    return (
      <ScrollView>

      </ScrollView>
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
