import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusComponent } from './status.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FilterService } from '../../../services/filter.service';
import { of } from 'rxjs';

describe('StatusComponent', () => {
  let component: StatusComponent;
  let fixture: ComponentFixture<StatusComponent>;
  let filterService: FilterService;
  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [StatusComponent],
      imports:[MatCheckboxModule, ReactiveFormsModule],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    filterService = TestBed.inject(FilterService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should set checkbox1Control and checkbox2Control to false if either flagSearcher or flagRegion is true', () => {
    spyOn(filterService,'getFlagSearcherOf').and.returnValue(of(true)); // Simula un valor de flagSearcher true
    spyOn(filterService,'getFlagRegion').and.returnValue(of(false)); // Simula un valor de flagRegion false
    component.checkFlag();
    // Comprueba si checkbox1Control y checkbox2Control se establecen en false
    expect(component.checkbox1Control.value).toBe(false);
    expect(component.checkbox2Control.value).toBe(false);
  });
  it('should set flag status and filter data when checkbox1Control is checked', () => {
    component.checkbox1Control = new FormControl(true);
    const spyFlagStatus = spyOn(filterService,'setFlagStatus');
    const spyFilterData = spyOn(filterService,'setFilterData');
    component.onCheckboxChange(component.checkbox1Control);
    expect(spyFlagStatus).toHaveBeenCalledWith(true);
    expect(spyFilterData).toHaveBeenCalledWith('memberOfUnited');
  });
  it('should set flag status and filter data when checkbox2Control is checked', () => {
    component.checkbox2Control = new FormControl(true);
    const spyFlagStatus = spyOn(filterService,'setFlagStatus');
    const spyFilterData = spyOn(filterService,'setFilterData');
    component.onCheckboxChange(component.checkbox2Control);
    expect(spyFlagStatus).toHaveBeenCalledWith(true);
    expect(spyFilterData).toHaveBeenCalledWith('independent');
  });
});
