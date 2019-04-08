import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  AsyncStorage
} from 'react-native';
import { WebBrowser, Linking, Asset, Font, Icon } from 'expo';

import { withGlobalContext } from '../components/GlobalContext'

import { MonoText } from '../components/StyledText';

class AuthLoadingScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
  }


  componentDidMount() {
    this._loadResourcesAsync()
        .then(this._loadToken)
        .catch(this._handleLoadingError)
        
  }

  _loadToken = async () => {
    const userToken = await AsyncStorage.getItem('userToken');

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    console.log(userToken)
    this.props.navigation.navigate(userToken ? 'Main' : 'Auth');
  };


  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('../assets/images/robot-dev.png'),
        require('../assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('../assets/fonts/SpaceMono-Regular.ttf'),
      }),
    //   new Promise((r, re) => {
    //       setTimeout(() => r(), 5000)
    //   })
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };
 

  render() {
    return (
      <View>
        <Text>Loading</Text>
        <Text>Loading</Text>
        <Text>Loading</Text>
      </View>
    );
  }
}

export default withGlobalContext(AuthLoadingScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 80,
  },
});
