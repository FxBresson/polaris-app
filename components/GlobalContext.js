import React from 'react';
import { ScrollView, RefreshControl, AsyncStorage} from 'react-native';
import { API_URL } from '../config';
import { GraphQLClient, request } from 'graphql-request'
import {
  getLineup,
  getPlayer,
  loginPlayer,
  getMaps,
  updatePlayer,
  addStrat
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
      lineup: null,
      maps: null
    }
  }
 
  async login(token, newLogin) {
    if (newLogin) {
      AsyncStorage.setItem('userToken', token);
    }
    this.client = new GraphQLClient(`${API_URL}/graphql`, {
      headers: {
        Authorization: `jwt ${token}`,
      },
    })


    try {
      const user = await this.client.request(loginPlayer, variables)
      return await this.setState({ userToken: token, user: user.playerLogin, lineupId: user.playerLogin.lineup})
    } catch (err) {
      console.error(err)
      return false
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
      console.log(err)
      return false
    }
  }

  async getGameData() {
    try {
      let maps = await this.client.request(getMaps)
      return await this.setState({ maps: maps.mapsMany})
    } catch(err) {
      console.log(err)
      return false
    }
  }

  async updatePlayerData(newUserObj) {
    try {
      let userObj = await this.client.request(updatePlayer, {record: newUserObj})
      return await this.setState({ user: userObj.playerUpdateById.record });
    } catch(err) {
      console.error(err)
      return false
    }
  }

  async updateLineupData() {

  }
  
  async addStrat(mapId) {
    const variables = {
      record: {
        lineup: this.state.lineupId,
        map: mapId
      }
    }
    try {
      let strat = await this.client.request(addStrat, variables)
      let lineup = this.state.lineup
      lineup.strats.push(strat.stratCreateOne.record)
      return await this.setState({lineup: lineup });
    } catch(err) {
      console.error(err)
      return false
    } 
  }

  render() {
    return (
      <GlobalContext.Provider
        value={{
          ...this.state,
          login: async (token, newLogin) => await this.login(token, newLogin),
          logout: (navigation) => this.logout(navigation),
          refreshData: async () => await this.getLineupData(),
          getGameData: async () => await this.getGameData(),
          updatePlayerData: async (newUserObj) => await this.updatePlayerData(newUserObj),
          addStrat: async (mapId) => await this.addStrat(mapId)
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