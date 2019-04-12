import React from 'react';
import { ScrollView, RefreshControl, AsyncStorage} from 'react-native';
import { API_URL } from '../config';
import { GraphQLClient } from 'graphql-request'
import {
  getLineup,
  getPlayer
} from '../helpers/queries';

export const GlobalContext = React.createContext();

export class GlobalContextProvider extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      value: { dummyData: 'DUMMY' },
      refreshing: false,
    }

    this.client = new GraphQLClient(`${API_URL}/graphql`, {
      headers: {
        authorization: `jwt ${this.state.userToken}`,
      },
    })
  }
 
  async login(token, btag, newLogin) {
    if (newLogin) {
      AsyncStorage.setItem('userToken', token);
      AsyncStorage.setItem('mainBtag', mainBtag);
    }
    const variables = {
      player: {
        mainBtag: btag
      }
    }
    await this.setState({ userToken: token })
    const user = await this.client.request(getPlayer, variables)
    await this.setState({ user: user, lineup: user.lineup})
  }

  logout(navigation) {
    AsyncStorage.removeItem('userToken')
    AsyncStorage.removeItem('mainBtag')
    this.setState({ userToken: null, user: null, lineup: null }, () => { navigation.navigate('Auth') })
  }

  async fetchLineupData() {
    const variables = {
      id: this.state.lineup
    }
    try {
      const data = await this.client.request(getLineup, variables)
      return data;
    } catch(err) {
      console.log(err)
      return err
    }
  }

  async refreshData() {
    try {
      let lineupData = await this.fetchLineupData()
      return await this.setState({ lineup: lineupData });
    } catch(err) {
      console.log('could not reload data')
    }
  }

  render() {
    return (
      <GlobalContext.Provider
        value={{
          ...this.state.value,
          login: (token, btag, newLogin) => this.login(token, btag, newLogin),
          logout: (navigation) => this.logout(navigation),
          refreshData: () => this.refreshData()
        }}
      >
        {this.props.children}
      </GlobalContext.Provider>
    )
  }
}

export function withGlobalContext(Component) {
  class ComponentWithContext extends React.Component {
    static navigationOptions = Component.navigationOptions;

    constructor(props) {
      super(props)
      console.log(GlobalContext._currentValue.fetchLineupData)
      this.state = {
        refreshing: false
      }
    }

    async _onRefresh() {
      await this.setState({ refreshing: true });
      try {
        await GlobalContext._currentValue.fetchLineupData()
      } catch(err) {

      }
      this.setState({ refreshing: false })
    }

    render() {
      return (
        <GlobalContext.Consumer>
          {(value) => {
            return (
              <ScrollView
                refreshControl={
                  <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={() => this._onRefresh()}
                  />
                }
              >
                <Component {...this.props} global={value} />
              </ScrollView>
            )
          }}
        </GlobalContext.Consumer>
      );
    };
  }

  return ComponentWithContext;
}