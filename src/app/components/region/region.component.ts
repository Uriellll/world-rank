import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../models/country.interface';
import { FilterService } from '../../services/filter.service';

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrl: './region.component.scss',
})
export class RegionComponent {
  regions: string[] = [];
  selectedRegion: string = '';
  constructor(
    private countriesService: CountriesService,
    private filterService: FilterService
  ) {
    this.getRegions();
    this.checkFlag();
  }
  getRegions() {
    this.countriesService.getCountries().subscribe((res: Country[]) => {
      this.regions = this.filterRegions(res);
      this.regions.push('All');
    });
  }
  filterRegions(data: Country[]): string[] {
    const uniqueRegions: string[] = [];
    // Filtrar solo las regiones únicas
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
    this.filterService.getFlagSearcherOf().subscribe((res) => {
      if (res) this.selectedRegion = '';
    });
    this.filterService.getFlagStatus().subscribe((res) =>{
      if (res) this.selectedRegion = '';
    })
  }
}
