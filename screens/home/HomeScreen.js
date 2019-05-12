import React from 'react';
import {
  View,
  StyleSheet,
  Image
} from 'react-native';
import { withGlobalContext} from '../../components/GlobalContext';
import moment from 'moment';
import 'moment/locale/fr';

import Svg from 'react-native-svg';

import { Text } from '../../components/custom-elements';
import Colors from '../../constants/Colors';

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };

  constructor(props, navigation) {
    super(props);
    this.state = {
      dataSource: {}
    };
  }

  componentDidMount() {
  }

  renderLineup(lineupData, i = 0) {
    return(
      <View style={styles.lineup} key={i}>
        <Text h1>{lineupData.name}</Text>
        <View style={styles.srContainer}>
          {lineupData.averageSr ?
            <>
            <Text h1 italic>{lineupData.averageSr}</Text>
            <Text h1 sup italic>SR</Text>
            </>
          :
            <Text h1 italic>No data</Text>
          }
        </View>
      </View>
    )
  }

  render() {
    const nextMatch = this.props.global.lineup.matchSchedule[0]

    return (
      <View style={styles.container}>
        <View style={styles.welcomeContainer}>
          <Image source={require('../../assets/images/logo.png')} style={styles.logo} resizeMode={'contain'} />
          <Text h1 italic style={styles.welcome}>Bienvenue {this.props.global.user.name} </Text>
        </View>
        <View style={styles.lineupsContainer}>
          {this.renderLineup(this.props.global.lineup)}
          {this.props.global.lineup.otherLineups.map((lineup, i) => {
            return this.renderLineup(lineup, i)
          })}
        </View>
        <View>
          <View style={styles.nextMatch}>
          {nextMatch ?
            <>
              <Text h2>{moment(nextMatch.date).format('L - HH:mm')}</Text>
              <Text h2>{nextMatch.type}</Text>
            </>
            :
            <Text h2>Pas de prochain match</Text>
          }
          </View>
        </View>
        {/* <Text>{JSON.stringify(this.props.global)}</Text> */}
      </View>
    );
  }
}

export default withGlobalContext(HomeScreen)

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    // alignItems: 'center',
  },
  welcomeContainer: {
    alignItems: 'center'
  },
  logo: {
    width: 175,
    height: 154,
    marginBottom: 20
  },
  welcome: {
    marginBottom: 20
  },
  lineupsContainer: {
    marginBottom: 20
  },
  lineup: {
    width: '100%',
    flexDirection: 'row',
    height: 44,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 75
  },
  srContainer: {
    backgroundColor: Colors.opacityNavyBlue,
    borderRadius: 44,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    flexDirection: 'row'
  },
  nextMatch: {
    height: 38,
    borderRadius: 38,
    paddingHorizontal: 20,
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.navyBlue,
  }
});
