import React, {Component} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import About from '../screens/About';
import {Quotes} from '../screens/Quotes';

export type TabParamList = {
  About: About;
  Quotes: Quotes;
};

const Tab = createBottomTabNavigator<TabParamList>();

export default class BottomTabNavigator extends Component {
  render() {
    return (
      <Tab.Navigator
        initialRouteName="About"
        tabBarOptions={{
          activeTintColor: '#e91e63',
        }}>
        <Tab.Screen
          name="About"
          component={About}
          options={{tabBarLabel: 'О приложении'}}
        />
        <Tab.Screen
          name="Quotes"
          options={{tabBarLabel: 'Котировки'}}
          component={Quotes}
        />
      </Tab.Navigator>
    );
  }
}
