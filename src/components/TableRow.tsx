import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {TableCell} from './TableCell';
import {TTableRow} from '../store/Store';
import {observer} from 'mobx-react';
import {computed} from 'mobx';

interface IProps {
  row: TTableRow;
  number: number;
  type?: ETableRowTypes;
  error?: boolean;
}

export enum ETableRowTypes {
  Head,
  Error,
}

@observer
export class TableRow extends Component<IProps> {
  render() {
    return (
      <View style={this.getRowStyles}>
        {Object.values(this.props.row).map((text, i) => (
          <TableCell cell={text} key={i} />
        ))}
      </View>
    );
  }

  @computed
  private get getRowStyles() {
    switch (this.props.type) {
      case ETableRowTypes.Error:
        return {...styles.errorRow, ...styles.row};
      case ETableRowTypes.Head:
        return styles.headerRow;

      default:
        return {
          ...styles.row,
          backgroundColor: this.props.number % 2 === 1 ? '#daf3ff' : 'white',
        };
    }
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flex: 1,
    height: 40,
  },
  errorRow: {
    backgroundColor: '#fd4c4c',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#37C2D0',
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    height: 50,
  },
});
