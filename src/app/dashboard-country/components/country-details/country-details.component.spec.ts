import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CountryDetailsComponent } from './country-details.component';
import { ActivatedRoute, ParamMap, convertToParamMap } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatIconModule } from '@angular/material/icon';
import { BehaviorSubject} from 'rxjs';

export class MockActivatedRoute {
  paramMap: ParamMap = convertToParamMap({});

  setParamMap(paramMap: ParamMap) {
    this.paramMap = paramMap;
  }
}

describe('CountryDetailsComponent', () => {
  let component: CountryDetailsComponent;
  let fixture: ComponentFixture<CountryDetailsComponent>;
  let activatedRoute: any;

  beforeEach(async () => {
    activatedRoute = {
      paramMap: new BehaviorSubject(convertToParamMap({ name: 'mexico' }))
    };
    await TestBed.configureTestingModule({
      declarations: [CountryDetailsComponent],
      imports: [HttpClientTestingModule, MatIconModule],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRoute }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CountryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call getInfoCountry when name has more than 3 characters', () => {
    spyOn(component, 'getInfoCountry');
    component.ngOnInit();
    expect(component.getInfoCountry).toHaveBeenCalledWith('mexico');
  });
  it('should call  getInfoShort when name has 3 characters', () => {
    spyOn(component, 'getInfoShort');
    activatedRoute.paramMap.next(convertToParamMap({ name: 'mex' }));
    component.ngOnInit();
    expect(component.getInfoShort).toHaveBeenCalledWith('mex');
  });
});
