import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {observer} from 'mobx-react';
import {computed, makeObservable, observable, runInAction,} from 'mobx';

interface IProps {
  cell: string | number;
}

enum ETypeChange {
  Up,
  Down,
  Stay,
}

@observer
export class TableCell extends Component<IProps> {
  @observable valueChangesType: ETypeChange = ETypeChange.Stay;

  constructor(props: IProps) {
    super(props);
    makeObservable(this);
  }

  componentDidUpdate(prevProps: Readonly<IProps>): void {
    if (+prevProps.cell !== +this.props.cell) {
      runInAction(() => {
        this.valueChangesType =
          +prevProps.cell < +this.props.cell
            ? ETypeChange.Up
            : ETypeChange.Down;
      });
    }
  }

  render(): React.ReactNode {
    return (
      <View style={styles.cell}>
        <Text style={this.rowColor}>{this.props.cell}</Text>
      </View>
    );
  }

  @computed
  private get rowColor() {
    switch (this.valueChangesType) {
      case ETypeChange.Down:
        return {
          color: 'red',
        };
      case ETypeChange.Up:
        return {
          color: 'green',
        };
      case ETypeChange.Stay:
        return {
          color: 'black',
        };
    }
  }
}

const styles = StyleSheet.create({
  cell: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
