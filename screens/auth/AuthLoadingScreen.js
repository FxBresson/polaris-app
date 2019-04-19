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
  AsyncStorage,
  ActivityIndicator
} from 'react-native';
import { WebBrowser, Linking, AuthSession, Asset, Font, Icon } from 'expo';

import { withGlobalContext } from '../../components/GlobalContext';

class AuthLoadingScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      resourcesLoaded: false,
      error: false,
      needLogin: false,
      isNewLogin: false 
    }
  }


  componentDidMount() {
    this._loadResourcesAsync()
      .then(() => {
        this.setState({ resourcesLoaded: true })
        this._loadToken()
      })
      .catch((err) => {
        console.warn(err);
        this.setState({ error: true })
      })
        
  }

  async _loadResourcesAsync() {
    return Promise.all([
      Asset.loadAsync([
        // require('../assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        ...Icon.Ionicons.font,
        'space-mono': require('../../assets/fonts/SpaceMono-Regular.ttf'),
      })
    ]);
  };

  async _loadToken() {
    const userToken = await AsyncStorage.getItem('userToken');
    const userBtag = await AsyncStorage.getItem('mainBtag')

    if (userToken) {
      this._loadDataAsync(userToken, userBtag, false)
    } else {
      this.setState({ needLogin: true })
      Linking.addEventListener('url', this.handleRedirect);
    }
  };

  async handleOAuthLogin() {
    // gets the app's deep link
    let redirectUrl = await Linking.getInitialURL()

    let authUrl = `https://polarisapi.serveo.net/auth/bnet?url=${encodeURIComponent(redirectUrl)}`
    
    try {
      await WebBrowser.openAuthSessionAsync(authUrl)
    } catch (err) {
      console.error(err)
    }
  }


  async handleRedirect(event) {
    Linking.removeEventListener('url', this.handleRedirect)
    // WebBrowser.dismissBrowser()

    let str = event.url.substring(event.url.indexOf('?')+1).split('&')
    let params = {}, d = decodeURIComponent;
    for (let pair of str) {
      pair = pair.split('=')
      params[d(pair[0])] = d(pair[1] || '');
    }

    try {
      this._loadDataAsync(params.token, params.user, true)
    } catch(err) {
      console.error(err)
      this.setState({ error: true })
    }
  }

  async _loadDataAsync(token, user, newLogin) {
    await this.setState({ needLogin: false, isNewLogin: newLogin })
    await this.props.global.login(token, user, newLogin)
    await this.props.global.refreshData()
    await this.props.global.getGameData()
    this.props.navigation.navigate('Main')
  }

  render() {
    return (
      <View>
        {!this.state.resourcesLoaded &&
          <View>
            <ActivityIndicator/>
            <Text>Loading Assets</Text>
          </View>
        }

        {!this.props.global.lineup &&
          <View>
            <ActivityIndicator/>
            <Text>Loading Data</Text>
          </View>
        }
        
        {this.state.needLogin &&
          <Button onPress={this.handleOAuthLogin} title="LOGIN"></Button>
        }

        {this.props.global.user &&
          (this.state.newLogin ?
          <Text>Welcome {this.props.global.user.mainBtag}</Text>
          :
          <Text>Welcome back {this.props.global.user.mainBtag}</Text>
          )
        }
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
