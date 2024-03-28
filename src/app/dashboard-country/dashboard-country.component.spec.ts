import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCountryComponent } from './dashboard-country.component';

describe('DashboardCountryComponent', () => {
  let component: DashboardCountryComponent;
  let fixture: ComponentFixture<DashboardCountryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardCountryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardCountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
