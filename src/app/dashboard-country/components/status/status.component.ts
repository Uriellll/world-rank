import { FilterService } from '../../../services/filter.service';
import { Component, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription, combineLatest, forkJoin } from 'rxjs';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrl: './status.component.scss',
})
export class StatusComponent implements OnDestroy {
  checkbox1Control = new FormControl(false);
  checkbox2Control = new FormControl(false);
  subscription:Subscription = new Subscription();
  constructor(private filterService: FilterService) {
    this.checkFlag();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  onCheckboxChange(checkbox: FormControl) {
    if (checkbox === this.checkbox1Control && checkbox.value) {
      this.filterService.setFlagStatus(true);
      this.checkbox2Control.setValue(false);
      this.filterService.setFilterData('memberOfUnited');
    } else if (checkbox === this.checkbox2Control && checkbox.value) {
      this.filterService.setFlagStatus(true);
      this.checkbox1Control.setValue(false);
      this.filterService.setFilterData('independent');
    }
  }
  checkFlag() {
    this.subscription.add(combineLatest([
      this.filterService.getFlagSearcherOf(),
      this.filterService.getFlagRegion()
    ]).subscribe(([flagSearcher, flagRegion]) => {
      if (flagSearcher || flagRegion) {
        this.checkbox2Control.setValue(false);
        this.checkbox1Control.setValue(false);
      }
    }));
  }
}
