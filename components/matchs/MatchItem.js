import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import moment from 'moment';
import 'moment/locale/fr';
import Colors from '../../constants/Colors';
import { Text, Icon } from '../custom-elements';

export default class MatchItem extends Component {

  constructor(props) {
    super(props)

    this.styles = StyleSheet.create({
      matchItem: {
        flexDirection: 'row',
        height: this.props.sr || this.props.score ? 80 : 48,
        backgroundColor: Colors.opacityNavyBlue,
        borderRadius: 25,
        justifyContent: 'space-between',
        alignItems: 'stretch',
        marginBottom: 10,
        marginHorizontal: 10,
        paddingLeft: 20,

      },
      matchInfos: {
        flexDirection: 'row',
    
      },
      infoColumn: {
        // width: '40%',
        flex: 2,
        justifyContent: 'space-evenly',
      },
      rightColumn: {
        alignItems: 'flex-end',
        paddingRight: 20
      },
      btn: {
        width: 48,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.opacityNavyBlue,
        borderBottomRightRadius: 25,
        borderTopRightRadius: 25,

      }
    })
  }

  

  render() {
    return (
      <TouchableOpacity
        onPress={this.props.goToMatch}
        style={this.styles.matchItem}
      >
        <View style={this.styles.infoColumn}>
          <Text>{moment(this.props.date).format('L - HH:mm')}</Text>
          {this.props.sr &&
            <Text>{this.props.sr}</Text>
          }
        </View>
        <View style={[this.styles.infoColumn, this.styles.rightColumn]}>
          <Text>{this.props.type}</Text>
          {this.props.score &&
            <Text>{this.props.score}</Text>
          }
        </View>
        <View style={this.styles.btn}>
          <Icon
            library={'SimpleLineIcons'}
            name={'arrow-right'}
            size={12}
          />
        </View>
      </TouchableOpacity>
    )
  }
}


