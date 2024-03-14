import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FilterService } from '../../services/filter.service';
import { Subscription, combineLatest } from 'rxjs';

@Component({
  selector: 'app-searcher',
  templateUrl: './searcher.component.html',
  styleUrl: './searcher.component.scss',
})
export class SearcherComponent implements OnInit, OnDestroy {
  searcherControl: FormControl = new FormControl('');
  private subscriptions: Subscription[] = [];
  constructor(private filterService: FilterService) {}
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
  ngOnInit(): void {
    this.checkValueChanges();
    this.checkFlag();
  }
  checkValueChanges() {
    this.subscriptions.push(
      this.searcherControl.valueChanges.subscribe((value) => {
        if (value != '') this.filterService.setFlagSearcherOf(true);
        this.filterService.setFilterData(value);
      })
    );
  }
  checkFlag() {
    this.subscriptions.push(
      combineLatest([
        this.filterService.getFlagRegion(),
        this.filterService.getFlagStatus(),
      ]).subscribe(([flagRegion, flagStatus]) => {
        if (flagStatus || flagRegion) {
          this.searcherControl.setValue('');
        }
      })
    );
  }
}
