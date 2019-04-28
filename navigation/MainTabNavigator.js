import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';

import {
  HomeScreen
} from '../screens/home';
import {
  LineupScreen
} from '../screens/lineup';
import {
  PlanningScreen,
  MatchScreen
} from '../screens/planning';
import {
  StratScreen,
  MapScreen
} from '../screens/strats';
import {
  ProfileScreen
} from '../screens/profile';

import Colors from '../constants/Colors';



const headerStyle = {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: Colors.navyBlue,
    },
    headerTintColor: Colors.textColor,
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  }
}

/*
  HOME
*/
const HomeStack = createStackNavigator({
  Home: HomeScreen,
}, {
  initialRouteName: 'Home',
  ...headerStyle
})
HomeStack.navigationOptions = {
  tabBarLabel: 'Home'
};

/*
  LINEUP
*/
const LineupStack = createStackNavigator({
  Lineup: LineupScreen,
}, {
  ...headerStyle
});
LineupStack.navigationOptions = {
  tabBarLabel: 'Lineup',
};

/*
  PLANNING
*/
const PlanningStack = createStackNavigator({
  Planning: PlanningScreen,
  Match: MatchScreen
}, {
  initialRouteName: 'Planning',
  ...headerStyle
});
PlanningStack.navigationOptions = {
  tabBarLabel: 'Planning',
}

/*
  STRATS
*/
const StratStack = createStackNavigator({
  Strat: StratScreen,
  Map: MapScreen
}, {
  initialRouteName: 'Strat',
  ...headerStyle
});
StratStack.navigationOptions = {
  tabBarLabel: 'Strats',
};

/*
  PROFILE
*/
const ProfileStack = createStackNavigator({
  Profile: ProfileScreen,
}, {
  ...headerStyle
});
ProfileStack.navigationOptions = {
  tabBarLabel: 'Profile',
};

// const SettingsStack = createStackNavigator({
//   Settings: SettingsScreen,
// }, {
//   tabBarLabel: 'Settings',
//   tabBarIcon: ({ focused }) => (
//     <TabBarIcon
//       focused={focused}
//       name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
//     />
//   ),
// });

export default createBottomTabNavigator({
  HomeStack,
  LineupStack,
  PlanningStack,
  StratStack,
  ProfileStack
}, {
  tabBarOptions: {
    style: {
      backgroundColor: Colors.navyBlue,
    },
  }
});
