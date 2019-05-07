import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/custom-elements/TabBarIcon';

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
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      library={'AntDesign'}
      name={'home'}
    />
  ),
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
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      library={'Feather'}
      name={'user'}
    />
  ),
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
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      library={'AntDesign'}
      name={'calendar'}
    />
  ),
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
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      library={'MaterialCommunityIcons'}
      name={'target'}
    />
  ),
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
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      library={'Feather'}
      name={'user'}
    />
  ),
};

// const SettingsStack = createStackNavigator({
//   Settings: SettingsScreen,
// }, {
//   tabBarLabel: 'Settings',
//   tabBarIcon: ({ focused }) => (
//     <TabBarIcon
//       focused={focused}
//       library={'Feather'}
//       name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
//     />
//   ),
// });

export default createBottomTabNavigator({
  HomeStack,
  // LineupStack,
  PlanningStack,
  StratStack,
  ProfileStack
}, {
  tabBarOptions: {
    style: {
      backgroundColor: Colors.navyBlue,
    },
    activeTintColor: Colors.tabSelected,
    inactiveTintColor: Colors.tabDefault,
    
  }
});
