import React from 'react';
import { ScrollView, RefreshControl, AsyncStorage} from 'react-native';

import { API_URL } from '../config';
import { GraphQLClient } from 'graphql-request';

import {
  ADD_STRAT,
  CREATE_MATCH,
  GET_LINEUP,
  GET_MAPS,
  GET_PLAYER,
  LOGIN_PLAYER,
  UPDATE_PLAYER,
  UDPDATE_MATCH
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
      const user = await this.client.request(LOGIN_PLAYER)
      return await this.setState({ userToken: token, user: user.playerLogin, lineupId: user.playerLogin.lineup})
    } catch (err) {
      console.error(err)
      return false
    }
  }

  async logout(navigation) {
    AsyncStorage.removeItem('userToken')
    AsyncStorage.removeItem('mainBtag')
    await this.setState({ userToken: null, user: null, lineupId: null });
    navigation.navigate('Auth');
  }

  async changeLineup(lineupId) {
    await this.setState({ lineupId: lineupId })
    await this.requester(GET_LINEUP)
  }

  async requester(action, param = {}) {
    const newState = await this.getNewState(action, param)
    this.setState({
      ...this.state,
      ...newState
    })
  }

  async getNewState(action, param = {}) {
    let lineup = this.state.lineup
    try {
      switch (action) {
        case GET_MAPS: {
          
          let maps = await this.client.request(GET_MAPS)
          return { maps: maps.mapsMany}
        }
        case GET_LINEUP: {
          let variables = {
            id: this.state.lineupId
          }
          let lineupData = await this.client.request(GET_LINEUP, variables)
          return { lineup: lineupData.lineupById };
        }
        case 'UPDATE_LINEUP': {
          return null
          break;
        }
        case 'GET_PLAYER': {
          return null
        }
        case UPDATE_PLAYER: {
          let variables = {
            record: {
              ...param
            }
          }
          let userObj = await this.client.request(UPDATE_PLAYER, variables)
          return { user: userObj.playerUpdateById.record };
        }
        case ADD_STRAT: {
          let variables = {
            record: {
              lineup: this.state.lineupId,
              ...param
            }
          }
          let strat = await this.client.request(ADD_STRAT, variables)
          lineup.strats.push(strat.stratCreateOne.record)
          return { lineup: lineup };
        }
        case CREATE_MATCH: {
          let variables = {
            record: {
              lineup: this.state.lineupId,
              ...param
            }
          }
          let match = await this.client.request(CREATE_MATCH, variables)
          let lineup = await this.getNewState(GET_LINEUP)
          return lineup
        }
        case UDPDATE_MATCH: {
          let variables = {
            record: {
              ...param
            }
          }
          let match = await this.client.request(UDPDATE_MATCH, variables)
          let lineup = await this.getNewState(GET_LINEUP)
          return lineup
        }
        default:
          break;
      }
    } catch(err) {
      console.error(err)
      return null;
    }
  }
 

  render() {
    return (
      <GlobalContext.Provider
        value={{
          ...this.state,
          login: async (token, newLogin) => await this.login(token, newLogin),
          logout: (navigation) => this.logout(navigation),
          requester: async (action, param = {}) => await this.requester(action, param)
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
        await GlobalContext._currentValue.requester(GET_LINEUP)
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