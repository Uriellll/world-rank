import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FilterService } from '../../services/filter.service';

@Component({
  selector: 'app-searcher',
  templateUrl: './searcher.component.html',
  styleUrl: './searcher.component.scss'
})
export class SearcherComponent implements OnInit {
  searcherControl: FormControl = new FormControl('');
  constructor(private filterService:FilterService){
  }
  ngOnInit(): void {
    this.checkValueChanges();
    this.checkFlag();
   
  }
  checkValueChanges(){
    
    this.searcherControl.valueChanges.subscribe(value =>{
      if(value != '')this.filterService.setFlagSearcherOf(true); 
      this.filterService.setFilterData(value);
    });
    
  }
  checkFlag(){
    this.filterService.getFlagRegion().subscribe(res =>{
      if(res) this.searcherControl.setValue('');
    })
    this.filterService.getFlagStatus().subscribe(res =>{
      if(res) this.searcherControl.setValue('');
    })
  }
}
