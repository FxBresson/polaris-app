import React from 'react';
import { Platform, StatusBar, StyleSheet, View, AsyncStorage, Text } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import AppNavigator from './navigation/AppNavigator';

import { GlobalContextProvider } from './components/GlobalContext'

export default class App extends React.Component {

  constructor() {
    super()
    this.state = {
      isLoadingComplete: false,
      userToken: null
    };
  }

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <GlobalContextProvider>
          <View style={styles.container}>
            {Platform.OS === 'ios' && 
              <StatusBar barStyle="default" />
            }
            <AppNavigator />
          </View>
        </GlobalContextProvider>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return await true
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
