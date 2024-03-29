import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortComponent } from './sort.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FilterService } from '../../../services/filter.service';
import { of } from 'rxjs';

describe('SortComponent', () => {
  let component: SortComponent;
  let fixture: ComponentFixture<SortComponent>;
  let filterService:FilterService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SortComponent],
      imports:[MatFormFieldModule,
        MatSelectModule,
        BrowserAnimationsModule ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    filterService = TestBed.inject(FilterService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should sort by population', () => {
    const mockEvent:any = {target: {value: 'population'}};
    const sortService =spyOn(filterService,'setSort');
    component.sort(mockEvent);
    expect(sortService).toHaveBeenCalledWith('population');

  })
  it('should return by value default', () => {
    const mockEvent:any = {target: {value: 'default'}};
    const sortService =spyOn(filterService,'setSort');
    component.sort(mockEvent);
    expect(sortService).not.toHaveBeenCalled();

  })
});
