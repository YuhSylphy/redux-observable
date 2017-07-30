import { AnyAction, Middleware, MiddlewareAPI } from 'redux';
import { Observable, ObservableInput } from 'rxjs/Observable';
import { Scheduler } from 'rxjs/Scheduler';
import { Operator } from 'rxjs/Operator';

export declare class ActionsObservable<T> extends Observable<T> {
  /**
   * Just like RxJS itself, we can't actually make this method always type-safe
   * because we would need non-final position spread params e.g.
   *   `static of<T>(...items: T, scheduler?: Scheduler): ActionsObservable<T>`
   * which isn't possible in either JavaScript or TypeScript. So instead, we
   * provide safe typing for up to 6 items, following by a scheduler.
   */
  static of<T>(item1: T, scheduler?: Scheduler): ActionsObservable<T>;
  static of<T>(item1: T, item2: T, scheduler?: Scheduler): ActionsObservable<T>;
  static of<T>(item1: T, item2: T, item3: T, scheduler?: Scheduler): ActionsObservable<T>;
  static of<T>(item1: T, item2: T, item3: T, item4: T, scheduler?: Scheduler): ActionsObservable<T>;
  static of<T>(item1: T, item2: T, item3: T, item4: T, item5: T, scheduler?: Scheduler): ActionsObservable<T>;
  static of<T>(item1: T, item2: T, item3: T, item4: T, item5: T, item6: T, scheduler?: Scheduler): ActionsObservable<T>;
  static of<T>(...array: Array<T | Scheduler>): ActionsObservable<T>;

  static from<T>(ish: ObservableInput<T>, scheduler?: Scheduler): ActionsObservable<T>;
  static from<T, R>(ish: ArrayLike<T>, scheduler?: Scheduler): ActionsObservable<R>;

  constructor(input$: Observable<T>);
  lift<R>(operator: Operator<T, R>): ActionsObservable<R>;
  ofType<K extends string = string, R = T>(...key: K[]): ActionsObservable<R>;
}

export declare interface Epic<T, S, D = {}, R = T> {
  (action$: ActionsObservable<T>, store: MiddlewareAPI<S>, dependencies: D): Observable<R>;
}

export interface EpicMiddleware<T, S, R = T> extends Middleware {
  replaceEpic(nextEpic: Epic<T, S, R>): void;
}

interface Adapter {
  input: <T, U>(input$: Observable<T>) => U;
  output: <T, R>(output$: T) => Observable<R>;
}

interface Options<D = {}> {
  adapter?: Adapter;
  dependencies?: D;
}

export declare function createEpicMiddleware<T, S, D = {}, R = T>(rootEpic: Epic<T, S, D, R>, options?: Options): EpicMiddleware<T, S>;

export declare function combineEpics<T, S, D = {}, R = T>(...epics: Epic<T, S, D, R>[]): Epic<T, S, D, R>;
