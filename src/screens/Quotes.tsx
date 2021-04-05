import React, {Component} from 'react';
import {View} from 'react-native';
import {Table} from '../components/Table';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {TabParamList} from '../navigation/BottomTabNavigator';
import AppStore, {TTableRow} from '../store/Store';
import {observer} from 'mobx-react';

interface IProps {
  navigation: BottomTabNavigationProp<TabParamList, 'Quotes'>;
}

@observer
export class Quotes extends Component<IProps> {
  private _unsubscribeFocus = () => {};
  private _unsubscribeBlur = () => {};
  private _columns: TTableRow = {
    pair: 'Ticker',
    last: 'Last',
    highestBid: 'Highest bid',
    percentChange: 'Percent change',
  };

  componentDidMount = () => {
    this._unsubscribeFocus = this.props.navigation.addListener('focus', () => {
      AppStore.loadData();
    });
    this._unsubscribeBlur = this.props.navigation.addListener('blur', () => {
      AppStore.destroy$.next();
    });
  };

  componentWillUnmount(): void {
    this._unsubscribeFocus();
    this._unsubscribeBlur();
    AppStore.destroy$.next();
    AppStore.destroy$.complete();
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Table
          error={AppStore.error}
          columns={this._columns}
          data={AppStore.data}
        />
      </View>
    );
  }
}
