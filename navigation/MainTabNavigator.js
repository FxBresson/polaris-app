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

/*
  HOME
*/
const HomeStack = createStackNavigator({
  Home: HomeScreen,
}, {
  initialRouteName: 'Home',
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
});
