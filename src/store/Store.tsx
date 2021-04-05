import {makeAutoObservable} from 'mobx';
import {of, Subject, throwError, timer} from 'rxjs';
import {concatMap, map, pluck, switchMap, takeUntil} from 'rxjs/operators';
import {ajax} from 'rxjs/ajax';

class AppStore {
  loading = true;
  error = false;
  data: IPairInfo[] = [];
  destroy$ = new Subject<void>();
  counter = 0;

  constructor() {
    makeAutoObservable(this);
  }

  setLoading(loading: boolean) {
    this.loading = loading;
  }

  setError(error: boolean) {
    this.error = error;
  }

  setData(data: IPairInfo[]) {
    this.data = data;
    this.loading = false;
  }

  loadData() {
    timer(0, 5000)
      .pipe(
        takeUntil(this.destroy$),
        concatMap(() => {
          this.setLoading(true);
          this.counter++;
          return ajax('https://poloniex.com/public?command=returnTicker');
        }),
        pluck('response'),
        map((data: IResponse): IPairInfo[] =>
          Object.entries(data).map(([pair, pairInfo]) => ({
            pair,
            last: pairInfo.last,
            id: pairInfo.id,
            highestBid: pairInfo.highestBid,
            percentChange: pairInfo.percentChange,
          })),
        ),
        switchMap(data => {
          if (
            this.counter.toString().includes('3') ||
            this.counter.toString().includes('4') ||
            this.counter.toString().includes('5')
          ) {
            return throwError('Ooopppss');
          } else {
            return of(data);
          }
        }),
      )
      .subscribe(
        data => {
          this.setError(false);
          this.setData(data);
        },
        error => {
          console.log(error);
          this.setLoading(false);
          this.setError(true);
          this.loadData();
        },
      );
  }
}

export default new AppStore();

export interface IPairInfo extends TTableRow {
  id: number;
  pair: string;
  last: number;
  highestBid: number;
  percentChange: number;
}

export interface IResponse {
  [key: string]: IPairInfo;
}

export type TTableRow = {[key: string]: number | string};
