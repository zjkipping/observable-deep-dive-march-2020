import { Observable } from 'rxjs';
import { map, share, shareReplay, tap, scan, distinctUntilChanged } from 'rxjs/operators';

const promise = new Promise(resolve => {
  setTimeout(() => {
    console.log('inside the promise');
    resolve('data from promise');
  }, 1000);
}).then(response => console.log(response));

const obs = new Observable<number>(observer => {
  let count = 0;
  const interval = setInterval(() => {
    console.log('inside the observable');
    observer.next(count++)
  }, 1000);

  return () => {
    console.log('Cleanup!');
    clearInterval(interval);
  }
})

const sharedObservable = obs.pipe(
  share(),
)

const subscription = sharedObservable.pipe(
  tap(val => console.log('tap' + val)),
  map(val => val * 2),
).subscribe(response => console.log(response));

// sharedObservable.subscribe(response => console.log(response));


setTimeout(() => {
  subscription.unsubscribe();
}, 5000);

/*
Operators I use frequently:
  map
  shareReplay
  tap
  switchMap
  scan
  delay
  distinctUntilChanged
  debounceTime
  take
  takeUntil
  withLatestFrom
  startWith
  merge
  catchError
  retry
  filter
  reduce
  pluck
*/

/*
Creation Functions I use frequently:
  defer,
  from,
  of,
  combineLatest,
  merge,
  interval,
  fromEvent,
  throwError (unit testing)
*/
