import { FilterService } from './../../../services/filter.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearcherComponent } from './searcher.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BehaviorSubject } from 'rxjs';

describe('SearcherComponent', () => {
  let component: SearcherComponent;
  let fixture: ComponentFixture<SearcherComponent>;
  let filterService:FilterService;
  let flagRegionSubject: BehaviorSubject<boolean>;
  let flagStatusSubject: BehaviorSubject<boolean>;

  beforeEach(async () => {
    flagRegionSubject = new BehaviorSubject<boolean>(false);
    flagStatusSubject = new BehaviorSubject<boolean>(false);
    await TestBed.configureTestingModule({
      declarations: [SearcherComponent],
      imports: [
        MatFormFieldModule,
        MatIconModule,
        ReactiveFormsModule,
        MatInputModule,
        BrowserAnimationsModule,
      ],
      providers: [
        { 
          provide: FilterService,
          useValue: {
            getFlagRegion: () => flagRegionSubject.asObservable(),
            getFlagStatus: () => flagStatusSubject.asObservable(),
            setFlagSearcherOf: () => {},
            setFilterData:() => {}

          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SearcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    filterService = TestBed.inject(FilterService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should set flag and filter data when value changes', () => {
    const mockValue = 'test';
    const spySetFlagSearcherOf = spyOn(filterService, 'setFlagSearcherOf');
    const spySetFilterData = spyOn(filterService, 'setFilterData');
    component.searcherControl.setValue(mockValue);
    expect(spySetFlagSearcherOf).toHaveBeenCalledWith(true);
    expect(spySetFilterData).toHaveBeenCalledWith(mockValue);
  });
  it('should reset searcherControl value when either flagRegion or flagStatus changes', () => {
    const spySetValue = spyOn(component.searcherControl, 'setValue');
    // Cambiar la bandera flagRegion
    flagRegionSubject.next(true);
    component.checkFlag();
    expect(spySetValue).toHaveBeenCalledWith('');
    // Cambiar la bandera flagStatus
    spySetValue.calls.reset(); // Reiniciar las llamadas al método setValue
    flagStatusSubject.next(true);
    component.checkFlag();
    expect(spySetValue).toHaveBeenCalledWith('');
  });
});
