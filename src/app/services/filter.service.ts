import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, flatMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  private regionSubject: BehaviorSubject<string> = new BehaviorSubject<string>(
    ''
  );
  private searchFlagOf: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  private regionFlag: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  private statusFlag: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  private sortSubject: BehaviorSubject<string> = new BehaviorSubject<string>(
    ''
  );
  setFilterData(region: string): void {
    this.regionSubject.next(region);
  }
  getFilterData(): Observable<string> {
    return this.regionSubject.asObservable();
  }
  setFlagSearcherOf(value: boolean): void {
    this.searchFlagOf.next(value);
  }
  getFlagSearcherOf(): Observable<boolean> {
    return this.searchFlagOf.asObservable();
  }
  setFlagRegion(value: boolean): void {
    this.regionFlag.next(value);
  }
  getFlagRegion(): Observable<boolean> {
    return this.regionFlag.asObservable();
  }
  setFlagStatus(value: boolean): void {
    this.statusFlag.next(value);
  }
  getFlagStatus(): Observable<boolean> {
    return this.statusFlag.asObservable();
  }
  setSort(value: string): void {
    this.sortSubject.next(value);
  }
  getSort(): Observable<string> {
    return this.sortSubject.asObservable();
  }
}
