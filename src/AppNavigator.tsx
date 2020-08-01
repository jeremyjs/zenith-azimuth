import React from 'react';

import Ionicons from '@expo/vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Agenda, Inbox, Next } from './views';

const Routes = {
  Agenda: 'Agenda',
  Inbox: 'Inbox',
  Next: 'Next',
}

const screenOptions = ({ route }) => ({
  tabBarIcon: ({ focused, color, size }) => {
    let iconName;

    if (route.name === Routes.Inbox) {
      iconName = focused
        ? 'ios-folder-open'
        : 'ios-folder';
    } else if (route.name === Routes.Next) {
      iconName = focused ? 'ios-checkmark-circle' : 'ios-checkmark-circle-outline';
    } else if (route.name === Routes.Agenda) {
      iconName = focused ? 'ios-list-box' : 'ios-list';
    }

    // You can return any component that you like here!
    return <Ionicons name={iconName} size={size} color={color} />;
  },
})

const tabBarOptions = {
  activeTintColor: 'tomato',
  inactiveTintColor: 'gray',
}

const Tab = createBottomTabNavigator();

export const AppNavigator = () => (
  <NavigationContainer>
    <Tab.Navigator screenOptions={screenOptions} tabBarOptions={tabBarOptions}>
      <Tab.Screen name={Routes.Inbox} component={Inbox} />
      <Tab.Screen name={Routes.Next} component={Next} />
      <Tab.Screen name={Routes.Agenda} component={Agenda} />
    </Tab.Navigator>
  </NavigationContainer>
);
