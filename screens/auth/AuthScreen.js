import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button
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
    Linking.removeEventListener('url', this.handleRedirect)

    let str = event.url.substring(event.url.indexOf('?')+1).split('&')
    let params = {}, d = decodeURIComponent;
    // march and parse
    for (let pair of str) {
      pair = pair.split('=')
      params[d(pair[0])] = d(pair[1] || '');
    }

    this.props.global.login(params.token, params.user, true)
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

    } catch (err) {
      console.log('ERROR:', err)
    }
  }

  // addLinkingListener = () => {
  //   Linking.addEventListener('url', this.handleRedirect)
  // }
  // removeLinkingListener = () => {
  //   Linking.removeEventListener('url', this.handleRedirect)
  // }

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
