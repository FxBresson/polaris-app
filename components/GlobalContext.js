import React from 'react'

export const GlobalContext = React.createContext({
    userToken: null
});

export class GlobalContextProvider extends React.Component {
    state = {
    //   userToken: null
    }

    login = (token) => {
        this.setState({ userToken: token })
    }

    logout = (navigation) => {
        console.log('LOGIN OUT HAHAHAHAHAHA')
        this.setState({userToken: null}, () => {navigation.navigate('Auth')})
    }
  
    render () {
        return (
            <GlobalContext.Provider
                value={{
                    ...this.state,
                    login: this.login,
                    logout: this.logout
                }}
            >
                {this.props.children}
            </GlobalContext.Provider>
        )
    }
}
  
// create the consumer as higher order component
export const withGlobalContext = ChildComponent => props => (
    <GlobalContext.Consumer>
        {
        context => <ChildComponent {...props} global={context}  />
        }
    </GlobalContext.Consumer>
);