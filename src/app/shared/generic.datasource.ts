import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable } from 'rxjs';

export class GenericDataSource extends DataSource<any> {
  private readonly dataStream$ = new BehaviorSubject<any[]>([]);

  get data(): any[] {
    return this.dataStream$.value;
  }

  set data(data: any[]) {
    this.dataStream$.next(data);
  }

  constructor() {
    super();
  }

  public connect(): Observable<any[]> {
    return this.dataStream$;
  }

  public disconnect(collectionViewer: CollectionViewer): void {}

  public removeById(id: number): void {
    this.data = [...this.data].filter(element => element.id !== id);
  }

  public update(data: any[], reset: boolean): void {
    this.data = reset ? data : [...this.data].concat(data);
  }
}
