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
import { GET_MAPS, GET_LINEUP } from '../../helpers/queries'

import { withGlobalContext } from '../../components/GlobalContext';

class AuthLoadingScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      isLoadingResources: true,
      isLoadingData: false,
      error: false,
      needLogin: false,
      isNewLogin: false 
    }
  }


  async componentDidMount() {
    // LOAD ASSETS
    await Asset.loadAsync([
      // require('../assets/images/robot-prod.png'),
    ]),
    await Font.loadAsync({
      ...Icon.Ionicons.font,
      'space-mono': require('../../assets/fonts/SpaceMono-Regular.ttf'),
    })
    this.setState({ isLoadingResources: false })

    //LOAD TOKEN
    // await AsyncStorage.setItem('userToken', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InN0YXR1cyI6WyJQbGF5ZXIiLCJGb3VuZGVyIiwiQ2FwdGFpbiJdLCJfaWQiOiI1Y2FmNDFlNDI3ODg1MGFlNzZhNjFkNjEiLCJtYWluQnRhZyI6IlRvb3RobGVzcyMyMjM2IiwibGluZXVwIjoiNWNhZjQxNDA3NTllNzdkY2RmNDc0YmMxIiwiX192IjowLCJibmV0UHJvZmlsZUlkIjoiMTM4NDAzMTc3In0sImlhdCI6MTU1NTE2MDYwNX0.InnlY95Pkq7A_gqCLUnuloXoxYhtV0cbloT4t2wwP70')
    const userToken = await AsyncStorage.getItem('userToken');
    if (userToken) {
      this._loadDataAsync(userToken, false)
    } else {
      this.setState({ needLogin: true })
      
      Linking.addEventListener('url', this.handleRedirect.bind(this));
    }
  }

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
  handleRedirect(event) {
    Linking.removeEventListener('url', this.handleRedirect)
    // WebBrowser.dismissBrowser()

    let str = event.url.substring(event.url.indexOf('?')+1).split('&')
    let params = {}, d = decodeURIComponent;
    for (let pair of str) {
      pair = pair.split('=')
      params[d(pair[0])] = d(pair[1] || '');
    }

    console.log(params.token)

    console.log(this)
    this.loadDataAsync(params.token, true)
  }

  async loadDataAsync(token, newLogin) {
    try {
      await this.setState({ needLogin: false, isNewLogin: newLogin, isLoadingData: true })
      await this.props.global.login(token, newLogin)
      await this.props.global.requester(GET_LINEUP)
      await this.props.global.requester(GET_MAPS)
      this.props.navigation.navigate('Main')
    } catch(err) {
      console.error(err)
      this.setState({ error: true })
    }
  }

  render() {
    return (
      <View>
        {this.state.isLoadingResources &&
          <View>
            <ActivityIndicator/>
            <Text>Loading Assets</Text>
          </View>
        }

        {this.state.isLoadingData &&
          <View>
            <ActivityIndicator/>
            <Text>Loading Data</Text>
          </View>
        }
        
        {this.state.needLogin &&
          <Button onPress={() => this.handleOAuthLogin()} title="LOGIN"></Button>
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
