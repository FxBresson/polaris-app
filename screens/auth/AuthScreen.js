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
import { WebBrowser, Linking, AuthSession } from 'expo';
import { withGlobalContext } from '../../components/GlobalContext';

class AuthScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      dataSource: {},
      authResult: {}
    };
  }


  componentDidMount() {
    let scheme = 'nxet'
    Linking.getInitialURL()
      .then(url => {
        console.log("App.js getInitialURL Triggered")
        // this.handleOpenURL({ url });
      })
      .catch(error => console.error(error));
    Linking.addEventListener('url', this.handleRedirect);
  }

  handleRedirect = event => {
    console.log('event =')
    console.log(event)
    this.removeLinkingListener()

    this.props.global.login('THISISFX')
    this.props.navigation.navigate('Home')
    // WebBrowser.dismissBrowser()
  }

  handleOAuthLogin = async () => {
    // gets the app's deep link
    let redirectUrl = await Linking.getInitialURL()
    // console.log(redirectUrl)
    console.log('starting')

    // this should change depending on where the server is running
    let authUrl = `https://polarisapi.serveo.net/auth/bnet?url=${encodeURIComponent(redirectUrl)}`
    
    try {
      let authResult = await WebBrowser.openAuthSessionAsync(authUrl)
      // let authResult = await AuthSession.startAsync({authUrl: authUrl})
      console.log('authResult =')
      console.log(authResult)
      await AsyncStorage.setItem('userToken', 'THISISFX');
      
    } catch (err) {
      console.log('ERROR:', err)
    }
  }

  addLinkingListener = () => {
    Linking.addEventListener('url', this.handleRedirect)
  }
  removeLinkingListener = () => {
    Linking.removeEventListener('url', this.handleRedirect)
  }

  render() {
    return (
      <View style={styles.container}>
    
        <View>
          <Button onPress={this.handleOAuthLogin} title="LOGIN"></Button>
        </View>
      </View>
    );
  }
}

export default withGlobalContext(AuthScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 80,
  },
});
