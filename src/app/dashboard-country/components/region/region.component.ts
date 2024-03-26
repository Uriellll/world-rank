import { Component, OnDestroy } from '@angular/core';
import { CountriesService } from '../../../services/countries.service';
import { Country } from '../../../models/country.interface';
import { FilterService } from '../../../services/filter.service';
import { Subscription, combineLatest } from 'rxjs';

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrl: './region.component.scss',
})
export class RegionComponent implements OnDestroy {
  regions: string[] = [];
  selectedRegion: string = '';
  private subscriptions: Subscription[] = [];
  constructor(
    private countriesService: CountriesService,
    private filterService: FilterService
  ) {
    this.getRegions();
    this.checkFlag();
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
  getRegions() {
    this.subscriptions.push(
      this.countriesService.getCountries().subscribe((res: Country[]) => {
        this.regions = this.filterRegions(res);
        this.regions.push('All');
      })
    );
  }
  filterRegions(data: Country[]): string[] {
    const uniqueRegions: string[] = [];
    data.forEach((item) => {
      if (!uniqueRegions.includes(item.region)) {
        uniqueRegions.push(item.region);
      }
    });
    return uniqueRegions;
  }
  selectRegion(region: string): void {
    this.filterService.setFlagRegion(true);
    this.selectedRegion = region;
    if (region === 'All') {
      region = '';
    }
    this.filterService.setFilterData(region);
  }
  checkFlag() {
    this.subscriptions.push(
      combineLatest([
        this.filterService.getFlagSearcherOf(),
        this.filterService.getFlagStatus(),
      ]).subscribe(([flagSearcher, flagStatus]) => {
        if (flagStatus || flagSearcher) {
          this.selectedRegion = '';
        }
      })
    );
  }
}
