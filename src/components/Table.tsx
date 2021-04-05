import React, {Component} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {TTableRow} from '../store/Store';
import {ETableRowTypes, TableRow} from './TableRow';
import {observer} from 'mobx-react';

interface IProps {
  data: TTableRow[];
  columns: TTableRow;
  error: boolean;
}

@observer
export class Table extends Component<IProps> {
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.data}
          style={{width: '100%'}}
          keyExtractor={(item, index) => index.toString()}
          ListHeaderComponent={this.tableHeader}
          stickyHeaderIndices={[0]}
          renderItem={this.renderItem}
        />
      </View>
    );
  }

  private tableHeader = ({index}: {index: number}) => {
    return (
      <View style={{flexDirection: 'column'}}>
        <TableRow
          type={ETableRowTypes.Head}
          number={index}
          row={this.props.columns}
          key={index}
        />
        {this.props.error ? (
          <TableRow
            row={{error: 'Ошибка'}}
            number={index}
            type={ETableRowTypes.Error}
          />
        ) : null}
      </View>
    );
  };

  private renderItem = ({item, index}: {item: TTableRow; index: number}) => (
    <TableRow
      number={index}
      row={this.getRow(item, this.props.columns)}
      key={item.id}
    />
  );

  private getRow = (row: TTableRow, columns: TTableRow): TTableRow => {
    const fields = Object.keys(columns);
    const readyRow: TTableRow = {};
    for (let field of fields) {
      readyRow[field] = row[field];
    }
    return readyRow;
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 26,
  },
});
