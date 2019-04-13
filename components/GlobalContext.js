import React from 'react';
import { ScrollView, RefreshControl, AsyncStorage} from 'react-native';
import { API_URL } from '../config';
import { GraphQLClient, request } from 'graphql-request'
import {
  getLineup,
  getPlayer
} from '../helpers/queries';

export const GlobalContext = React.createContext();

export class GlobalContextProvider extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      userToken: null,
      user: null,
      lineupId: null,
      lineup: null
    }
  }
 
  async login(token, btag, newLogin) {
    if (newLogin) {
      AsyncStorage.setItem('userToken', token);
      AsyncStorage.setItem('mainBtag', btag);
    }
    const variables = {
      player: {
        mainBtag: btag
      }
    }
    this.client = new GraphQLClient(`${API_URL}/graphql`, {
      headers: {
        Authorization: `jwt ${token}`,
      },
    })


    try {
      const user = await this.client.request(getPlayer, variables)
      return await this.setState({ userToken: token, user: user.playerOne, lineupId: user.playerOne.lineup})
    } catch (err) {
      return false
      console.error(err)
    }
  }

  logout(navigation) {
    AsyncStorage.removeItem('userToken')
    AsyncStorage.removeItem('mainBtag')
    this.setState({ userToken: null, user: null, lineupId: null }, () => { navigation.navigate('Auth') })
  }

  async changeLineup(lineupId) {
    await this.setState({ lineupId: lineupId })
    await this.getLineupData()
  }


  async getLineupData() {
    const variables = {
      id: this.state.lineupId
    }
    try {
      let lineupData = await this.client.request(getLineup, variables)
      return await this.setState({ lineup: lineupData.lineupById });
    } catch(err) {
      console.error('could not reload data')
      return false
    }
  }

  render() {
    return (
      <GlobalContext.Provider
        value={{
          ...this.state,
          login: async (token, btag, newLogin) => await this.login(token, btag, newLogin),
          logout: (navigation) => this.logout(navigation),
          refreshData: async () => await this.getLineupData()
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
      this.state = {
        refreshing: false
      }
    }

    async _onRefresh() {
      await this.setState({ refreshing: true });
      try {
        await GlobalContext._currentValue.getLineupData()
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