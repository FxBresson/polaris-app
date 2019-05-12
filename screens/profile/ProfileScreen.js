import React from 'react';
import { withGlobalContext } from '../../components/GlobalContext'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Picker,
  Dimensions
} from 'react-native';
import {
  Avatar, Image,
} from 'react-native-elements';

import { imgFromApi } from '../../helpers'; 

import {
  LineChart,
} from 'react-native-chart-kit'

import moment from 'moment';
import 'moment/locale/fr';

import { Text, Button } from '../../components/custom-elements';
import Colors from '../../constants/Colors';

import { UPDATE_PLAYER } from '../../helpers/queries';
import DoodleCheckbox from '../../components/doodle/DoodleCheckbox';

class ProfileScreen extends React.Component {
  
  static navigationOptions = ({navigation}) => {
    const { params = {} } = navigation.state
    return {
      title: params ? params.pageTitle : null,
      headerRight: (
        // <TouchableOpacity
        //   style={{backgroundColor: 'red'}}
        //   onPress={() => params.toggleEditMode()}
          
        // >
        //   <Text>{params.editingMode ? 'done' : 'edit'}</Text>
        // </TouchableOpacity>
        <Button
          onPress={() => params.toggleEditMode()}
          style={{backgroundColor: Colors.denimBlue}}
        >
          <Text>{params.editingMode ? 'done' : 'edit'}</Text>
        </Button>
      ),
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      editingMode: false,
      userTemp: {}
    }
  }

  toggleEditMode() {
    editingMode = this.state.editingMode
    if (editingMode) {
      let newUserObj = {
        _id: this.props.global.user._id,
        ...this.state.userTemp
      }
      try {
        this.props.global.requester(UPDATE_PLAYER, newUserObj)
        this.setState({userTemp: {}})
      } catch (err) {
        console.error(err)
      }
    }
    this.props.navigation.setParams({
      editingMode: !editingMode
    })
    this.setState({editingMode: !editingMode})
  }

  componentDidMount() {
    this.props.navigation.setParams({
      toggleEditMode: () => this.toggleEditMode(),
      pageTitle: this.props.global.user.name
    })
  }

  logout() {
    this.props.global.logout(this.props.navigation)
  }

  render() {
    const user = this.props.global.user
    const characs = user.lastStats.top_heroes.quickplay.played.slice(0, 5)
    const dataset = user.profile.rank.slice(0, 7)

    const data = {
      labels: dataset.map((item) => moment(item.date).format('D/YY')).reverse(),
      datasets: [{
        data: dataset.map((item) => item.srValue).reverse(),
      }]
    }
    const chartConfig = {
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity*2})`,
      withInnerLines: false,
      decimalPlaces: 0
    }
    
    return (
      <View style={styles.container}>
      
        <View style={styles.section}>
          <View style={styles.avatarContainer}>
            <Image style={styles.avatar} source={{ uri: user.profile.portrait }} />
            <Image style={styles.levelBorder} source={{ uri: user.profile.levelFrame }} />
            <Image style={styles.leverStars} source={{ uri: user.profile.levelStars }} />
          </View>

          <Text h1 bold italic>{user.mainBtag}</Text>
        </View>

        <View style={styles.section}>
          <View style={styles.infosLine}>
            <View style={[styles.infoChip, styles.infoChipRank]}>
              {user.profile.rank.length && user.profile.rank[0].srValue ?
                <>
                {user.profile.rank_img ?
                  <Image style={styles.infoImg} source={{ uri: user.profile.rank_img }} />
                  :
                  <View style={{paddingRight: 10}}></View>
                }
                <Text h2 italic>{user.profile.rank[0].srValue}</Text>
                <Text h2 sup italic>SR</Text>
                </>
              :
                <Text h2 italic>Not ranked yet</Text>
              }
            </View>
            
            {/* <Image style={[styles.infoImg, styles.infoLineCenter]} source={{ uri: user.profile.icon }} resizeMode={'cover'} /> */}
            
            <View style={styles.infoChip}>
              {this.state.editingMode ?
                <Picker
                  selectedValue={this.state.userTemp.role || user.role._id}
                  itemStyle={{color: Colors.textColor}}
                  style={{height: 50, width: 100, color: Colors.textColor}}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({userTemp: {
                      ...this.state.userTemp,
                      role: itemValue
                    }})
                  }>
                  {this.props.global.roles.map((role, i) => <Picker.Item key={i} label={role.name} value={role._id} />)}
                </Picker>
                :
                <>
                  <Image source={{uri: imgFromApi(user.role.img)}} style={styles.roleImage} />
                  <Text h2 italic>{user.role.name}</Text>
                </>
              }
            </View>
          </View>

          <View style={[styles.infosLine, {marginBottom: 0}]}> 
            <View style={[styles.infoChip, {width: '100%'}]}>
                <Text h2>{user.status.join(' - ')}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text h2>Héros Préférés</Text>
          </View>
          <View style={styles.favHeroes}>
            {characs.map((charac, i) => {
              const img = this.props.global.characters.find(c => c.name === charac.hero).img
              return (
                <Image key={i} style={styles.characAvatar} source={{uri: img}} />
              )
            })}
          </View>
        </View>
       
        

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text h2>Évolution du rang</Text>
          </View>

          <View style={styles.rankedChart}>
            <LineChart 
              data={data}
              width={Dimensions.get('window').width-10}
              height={220}
              chartConfig={chartConfig}
            />
          </View>
        </View>

       
        {this.state.editingMode &&
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text h2>{'Paramètres'}</Text>
            </View>

            <View style={styles.paramLine}>
              <Text>Disponibilité par défaut</Text>
              <DoodleCheckbox
                dispoState={this.state.userTemp.defaultAvailability != undefined ? this.state.userTemp.defaultAvailability : user.defaultAvailability }
                onStateChange={(newValue) => {
                  this.setState({userTemp: {
                    ...this.state.userTemp,
                    defaultAvailability: newValue
                  }})
                }}
                touchable={this.state.editingMode}
              />
            </View>
          </View>
        }


        <View style={styles.section}>
          <Button onPress={() => this.logout()} style={{width: 110}}>
            <Text>Logout</Text>
          </Button>
        </View>
        
      </View>
    );
  }
}

export default withGlobalContext(ProfileScreen)

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    // alignItems: 'center',
  },
  avatarContainer: {
    width: 250,
    height: 250,
    marginTop: -50,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 100,
    position: 'absolute',
    left: 65,
    top: 65
  },
  levelBorder: {
    width: 250, 
    height: 250,
    ...StyleSheet.absoluteFill
  },
  leverStars: {
    width: 250, 
    height: 125,
    position: 'absolute',
    top: 125,
  },
  infosLine: {
    width: '100%',
    paddingHorizontal: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15
  },
  roleImage: {
    width: 20,
    height: 20,
    marginRight: 10
  },  
  infoChip: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderRadius: 40,
    backgroundColor: Colors.opacityNavyBlue,
    flexDirection: 'row'
  },
  infoChipRank: {
    paddingLeft: 5
  },
  infoLineCenter: {
    marginHorizontal: 10
  },  
  infoImg: {
    height: 40,
    width: 40
  },
  characAvatar: {
    width: 50, 
    height: 50, 
    borderRadius: 50,
    marginRight: 5
  },
  section: {
    alignItems: 'center',
    marginBottom: 30,
    width: '100%',
  },
  sectionHeader: {
    paddingVertical: 7,
    width: 210,
    backgroundColor: Colors.navyBlue,
    borderRadius: 50,
    alignItems: 'center',
    marginBottom: 20
  },
  favHeroes: {
    flexDirection: 'row'
  },
  rankedChart: {
    borderRadius: 25,
    backgroundColor: Colors.opacityNavyBlue,
    paddingVertical: 10,
    paddingRight: 10,
    textAlign: 'center',
    alignItems: 'center'
  },
  paramLine: {
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    backgroundColor: Colors.opacityNavyBlue,
    borderRadius: 40,
    height: 40,
  }
});
  
