import React from 'react';
import {Button, StyleSheet, View} from 'react-native';
import {TabActions} from '@react-navigation/native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {TabParamList} from '../navigation/BottomTabNavigator';

interface Props {
  navigation: BottomTabNavigationProp<TabParamList, 'About'>;
}

export default class About extends React.Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Button title="Перейти в котировки" onPress={this.navigate} />
      </View>
    );
  }

  navigate = () => this.props.navigation.dispatch(TabActions.jumpTo('Quotes'));
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
