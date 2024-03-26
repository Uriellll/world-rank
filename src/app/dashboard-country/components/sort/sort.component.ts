import { FilterService } from '../../../services/filter.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrl: './sort.component.scss'
})
export class SortComponent {
  constructor(private filterService: FilterService){
  }
  sort(event:Event){
    const selectedValue = (event.target as HTMLSelectElement).value;
    if(selectedValue == 'default') return;
    else this.filterService.setSort(selectedValue);
  }
}
