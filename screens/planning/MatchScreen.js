import React from 'react';
import { withGlobalContext } from '../../components/GlobalContext'
import {
  View,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Overlay } from 'react-native-elements';

class MatchScreen extends React.Component {
  static navigationOptions = {
    title: '',
  };

  constructor(props) {
    super(props);
    this.state = {
      isOverlayVisible: true
    }
  }

  addMap() {
    this.setState({ isOverlayVisible: true })
  }


  render() {
    const itemId = navigation.getParam('matchId');
    const score = this.state.result.reduce((total, map) => total + map.score)
    const ennemyScore = this.state.result.reduce((total, map) => total + map.ennemyScore)

    return (
      <View style={styles.container}>

        <Overlay
          isVisible={this.state.isOverlayVisible}
          windowBackgroundColor="rgba(255, 255, 255, .5)"
          width="auto"
          height="auto"
          onBackdropPress={() => this.setState({ isOverlayVisible: false })}
        >
          <Text>This is Overlay</Text>
        </Overlay>

        <View>
          <Text>{this.state.date}</Text>
          <Text>{this.state.type}</Text>
        </View>

        <View>
          <View>
            <Text>{this.state.lineup}</Text>
            <Text>{this.state.teamSr}</Text>
          </View>
          <Text>VS</Text>
          <View>
            <Text>{this.state.ennemies}</Text>
            <Text>{this.state.sr}</Text>
          </View>
        </View>

        <View>
          <Text>{score}</Text>
          <Text>{ennemyScore}</Text>
        </View>

        {this.state.result.map((result, i) => {
          return (
            <View key={i}>
              <Text>{result.score}</Text>
              <Tile
                imageSrc={{uri: result.map.image}}
                title={result.map.name}
              ></Tile>;
              <Text>{result.ennemyScore}</Text>
            </View>
          )
        })}

        <Button
            title="+"
            onPress={this.addMap()}
        />
      </View>
    );
  }
}

export default withGlobalContext(MatchScreen)

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingTop: 80,
    },
  });
  
