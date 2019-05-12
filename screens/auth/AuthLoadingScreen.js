import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  AsyncStorage,
  ActivityIndicator
} from 'react-native';
import { WebBrowser, Linking, AuthSession, Asset, Font, Icon } from 'expo';
import { GET_MAPS, GET_LINEUP, GET_CHARACTERS, GET_ROLES, UPDATE_PLAYER, UPDATE_PLAYER_DATA } from '../../helpers/queries'

import { Text, Button } from '../../components/custom-elements';

import { withGlobalContext } from '../../components/GlobalContext';
import Colors from '../../constants/Colors';
import { API_URL } from '../../config';

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
      isNewLogin: false,
      loginError: null
    }

    this.handleRedirect = this.handleRedirect.bind(this)
  }


  async componentDidMount() {
    // LOAD ASSETS
    await Asset.loadAsync([
      require('../../assets/images/background.jpg'),
      require('../../assets/images/logo.png')
      // require('../assets/images/robot-prod.png'),
    ]),
    await Font.loadAsync({
      ...Icon.Ionicons.font,
      'space-mono': require('../../assets/fonts/SpaceMono-Regular.ttf'),
    })
    this.setState({ isLoadingResources: false })

    //LOAD TOKEN
    // await AsyncStorage.setItem('userToken', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InN0YXR1cyI6WyJQbGF5ZXIiLCJGb3VuZGVyIiwiQ2FwdGFpbiJdLCJfaWQiOiI1Y2FmNDFlNDI3ODg1MGFlNzZhNjFkNjEiLCJtYWluQnRhZyI6IlRvb3RobGVzcyMyMjM2IiwibGluZXVwIjoiNWNhZjQxNDA3NTllNzdkY2RmNDc0YmMxIiwiX192IjowLCJibmV0UHJvZmlsZUlkIjoiMTM4NDAzMTc3In0sImlhdCI6MTU1NTE2MDYwNX0.InnlY95Pkq7A_gqCLUnuloXoxYhtV0cbloT4t2wwP70')
    // await AsyncStorage.removeItem('userToken');
    const userToken = await AsyncStorage.getItem('userToken');
    if (userToken) {
      this.logPlayerIn(userToken, false)
    } else {
      this.setState({ needLogin: true })
      
      Linking.addEventListener('url', this.handleRedirect);
    }
  }

  async handleOAuthLogin() {
    // gets the app's deep link
    let redirectUrl = await Linking.getInitialURL()
    let authUrl = `${API_URL}/auth/bnet?url=${encodeURIComponent(redirectUrl)}`
    try {
      const loginState = await WebBrowser.openAuthSessionAsync(authUrl, redirectUrl)

      if (loginState.type === 'success') {
        this.handleRedirect(loginState)
      }
      
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
    this.logPlayerIn(params.token, true)
  }

  async logPlayerIn(token, newLogin) {
    try {
      await this.props.global.login(token, newLogin)
      await this.loadDataAsync(newLogin)
    } catch(err) {
      this.setState({loginError: err})
    }
  }

  async loadDataAsync(newLogin) {
    try {
      await this.setState({ loginError: null, needLogin: false, isNewLogin: newLogin, isLoadingData: true })
      await this.props.global.requester(GET_LINEUP)
      await this.props.global.requester(GET_MAPS)
      await this.props.global.requester(GET_CHARACTERS)
      await this.props.global.requester(GET_ROLES)
      this.props.navigation.navigate('Main')
      // await this.props.global.requester(UPDATE_PLAYER_DATA)
      // this.props.global.requester(GET_LINEUP)
    } catch(err) {
      console.warn(err)
      this.setState({ error: true })
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.isLoadingResources &&
          <View>
            <ActivityIndicator
            color={Colors.white}
            size={'large'}
            />
            <Text h3 style={styles.message}>Loading Assets</Text>
          </View>
        }

        {this.state.isLoadingData &&
          <View style={styles.message}>
            <ActivityIndicator
            color={Colors.white}
            size={'large'}
            />
            <Text h3 style={styles.message}>Loading Data</Text>
          </View>
        }

        {this.state.loginError &&
          <Text style={styles.error}>{this.state.loginError}</Text>
        }
        
        {this.state.needLogin &&
          <Button style={{marginTop: 40}} onPress={() => this.handleOAuthLogin()}>
            <Text>Login</Text>
          </Button>
        }

        {this.props.global.user &&
          <View style={styles.message}>
            {this.state.newLogin ?
              <Text h2>Welcome {this.props.global.user.mainBtag}</Text>
            :
              <Text h2>Welcome back {this.props.global.user.mainBtag}</Text>
            }
          </View>
        }
      </View>
    );
  }
}

export default withGlobalContext(AuthLoadingScreen)

const styles = StyleSheet.create({
  container: {
    paddingTop: 180,
    alignItems: 'center'
  },
  error: {
    color: 'red'
  },
  message: {
    marginTop: 20
  }
});
