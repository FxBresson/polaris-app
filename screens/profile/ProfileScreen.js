import React from 'react';
import { withGlobalContext } from '../../components/GlobalContext'
import {
  View,
  StyleSheet,
  Button,
  Text
} from 'react-native';

class ProfileScreen extends React.Component {
  static navigationOptions = {
    title: 'Profile',
  };

  constructor(props) {
    super(props)
  }

  logout() {
    this.props.global.logout(this.props.navigation)
  }

  render() {
    
    return (
      <View style={styles.container}>
        <Button onPress={() => this.logout()} title="Logout"></Button>
      </View>
    );
  }
}

export default withGlobalContext(ProfileScreen)

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingTop: 80,
    },
  });
  
